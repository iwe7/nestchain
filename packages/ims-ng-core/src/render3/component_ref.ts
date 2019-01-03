/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectorRef as ViewEngine_ChangeDetectorRef } from '../change_detection/change_detector_ref';
import { InjectionToken } from '../di/injection_token';
import { Injector } from '../di/injector';
import { inject } from '../di/injector_compatibility';
import {
  ComponentFactory as viewEngine_ComponentFactory,
  ComponentRef as viewEngine_ComponentRef,
} from '../linker/component_factory';
import { ComponentFactoryResolver as viewEngine_ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { ElementRef as viewEngine_ElementRef } from '../linker/element_ref';
import { NgModuleRef as viewEngine_NgModuleRef } from '../linker/ng_module_factory';
import { RendererFactory2 } from '../render/api';
import { Sanitizer } from '../sanitization/security';
import { Type } from '../type';
import { VERSION } from '../version';
import { assertComponentType, assertDefined } from './assert';
import {
  LifecycleHooksFeature,
  createRootComponent,
  createRootComponentView,
  createRootContext,
} from './component';
import { getComponentDef } from './definition';
import { NodeInjector } from './di';
import {
  addToViewTree,
  createLView,
  createNodeAtIndex,
  createTView,
  createViewNode,
  elementCreate,
  locateHostElement,
  refreshDescendantViews,
} from './instructions';
import { ComponentDef, RenderFlags } from './interfaces/definition';
import {
  TContainerNode,
  TElementContainerNode,
  TElementNode,
  TNode,
  TNodeType,
} from './interfaces/node';
import {
  RElement,
  RendererFactory3,
  domRendererFactory3,
  isProceduralRenderer,
} from './interfaces/renderer';
import {
  HEADER_OFFSET,
  LView,
  LViewFlags,
  RootContext,
  TVIEW,
} from './interfaces/view';
import { enterView, leaveView } from './state';
import { defaultScheduler, getTNode } from './util';
import { createElementRef } from './view_engine_compatibility';
import { RootViewRef, ViewRef } from './view_ref';

export class ComponentFactoryResolver extends viewEngine_ComponentFactoryResolver {
  /**
   * @param ngModule The NgModuleRef to which all resolved factories are bound.
   */
  constructor(private ngModule?: viewEngine_NgModuleRef<any>) {
    super();
  }

  resolveComponentFactory<T>(
    component: Type<T>,
  ): viewEngine_ComponentFactory<T> {
    ngDevMode && assertComponentType(component);
    const componentDef = getComponentDef(component)!;
    return new ComponentFactory(componentDef, this.ngModule);
  }
}

function toRefArray(map: {
  [key: string]: string;
}): { propName: string; templateName: string }[] {
  const array: { propName: string; templateName: string }[] = [];
  for (let nonMinified in map) {
    if (map.hasOwnProperty(nonMinified)) {
      const minified = map[nonMinified];
      array.push({ propName: minified, templateName: nonMinified });
    }
  }
  return array;
}

/**
 * Default {@link RootContext} for all components rendered with {@link renderComponent}.
 */
export const ROOT_CONTEXT = new InjectionToken<RootContext>(
  'ROOT_CONTEXT_TOKEN',
  { providedIn: 'root', factory: () => createRootContext(inject(SCHEDULER)) },
);

/**
 * A change detection scheduler token for {@link RootContext}. This token is the default value used
 * for the default `RootContext` found in the {@link ROOT_CONTEXT} token.
 */
export const SCHEDULER = new InjectionToken<((fn: () => void) => void)>(
  'SCHEDULER_TOKEN',
  {
    providedIn: 'root',
    factory: () => defaultScheduler,
  },
);

const NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};

function createChainedInjector(
  rootViewInjector: Injector,
  moduleInjector: Injector,
): Injector {
  return {
    get: <T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T): T => {
      const value = rootViewInjector.get(
        token,
        NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR,
      );

      if (
        value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
        notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR
      ) {
        // Return the value from the root element injector when
        // - it provides it
        //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        // - the module injector should not be checked
        //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
        return value as T;
      }

      return moduleInjector.get(token, notFoundValue);
    },
  };
}

/**
 * Render3 implementation of {@link viewEngine_ComponentFactory}.
 */
export class ComponentFactory<T> extends viewEngine_ComponentFactory<T> {
  selector: string;
  componentType: Type<any>;
  ngContentSelectors: string[];

  get inputs(): { propName: string; templateName: string }[] {
    return toRefArray(this.componentDef.inputs);
  }

  get outputs(): { propName: string; templateName: string }[] {
    return toRefArray(this.componentDef.outputs);
  }

  /**
   * @param componentDef The component definition.
   * @param ngModule The NgModuleRef to which the factory is bound.
   */
  constructor(
    private componentDef: ComponentDef<any>,
    private ngModule?: viewEngine_NgModuleRef<any>,
  ) {
    super();
    this.componentType = componentDef.type;
    this.selector = componentDef.selectors[0][0] as string;
    this.ngContentSelectors = [];
  }

  create(
    injector: Injector,
    projectableNodes?: any[][] | undefined,
    rootSelectorOrNode?: any,
    ngModule?: viewEngine_NgModuleRef<any> | undefined,
  ): viewEngine_ComponentRef<T> {
    const isInternalRootView = rootSelectorOrNode === undefined;
    ngModule = ngModule || this.ngModule;

    const rootViewInjector = ngModule
      ? createChainedInjector(injector, ngModule.injector)
      : injector;

    const rendererFactory = rootViewInjector.get(
      RendererFactory2,
      domRendererFactory3,
    ) as RendererFactory3;
    const sanitizer = rootViewInjector.get(Sanitizer, null);

    const hostRNode = isInternalRootView
      ? elementCreate(
          this.selector,
          rendererFactory.createRenderer(null, this.componentDef),
        )
      : locateHostElement(rendererFactory, rootSelectorOrNode);

    const rootFlags = this.componentDef.onPush
      ? LViewFlags.Dirty | LViewFlags.IsRoot
      : LViewFlags.CheckAlways | LViewFlags.IsRoot;
    const rootContext: RootContext = !isInternalRootView
      ? rootViewInjector.get(ROOT_CONTEXT)
      : createRootContext();

    const renderer = rendererFactory.createRenderer(
      hostRNode,
      this.componentDef,
    );

    if (rootSelectorOrNode && hostRNode) {
      ngDevMode && ngDevMode.rendererSetAttribute++;
      isProceduralRenderer(renderer)
        ? renderer.setAttribute(hostRNode, 'ng-version', VERSION.full)
        : hostRNode.setAttribute('ng-version', VERSION.full);
    }

    // Create the root view. Uses empty TView and ContentTemplate.
    const rootLView = createLView(
      null,
      createTView(-1, null, 1, 0, null, null, null),
      rootContext,
      rootFlags,
      rendererFactory,
      renderer,
      sanitizer,
      rootViewInjector,
    );

    // rootView is the parent when bootstrapping
    const oldLView = enterView(rootLView, null);

    let component: T;
    let tElementNode: TElementNode;
    try {
      if (rendererFactory.begin) rendererFactory.begin();

      const componentView = createRootComponentView(
        hostRNode,
        this.componentDef,
        rootLView,
        rendererFactory,
        renderer,
      );

      tElementNode = getTNode(0, rootLView) as TElementNode;

      // Transform the arrays of native nodes into a structure that can be consumed by the
      // projection instruction. This is needed to support the reprojection of these nodes.
      if (projectableNodes) {
        let index = 0;
        const tView = rootLView[TVIEW];
        const projection: TNode[] = (tElementNode.projection = []);
        for (let i = 0; i < projectableNodes.length; i++) {
          const nodeList = projectableNodes[i];
          let firstTNode: TNode | null = null;
          let previousTNode: TNode | null = null;
          for (let j = 0; j < nodeList.length; j++) {
            if (tView.firstTemplatePass) {
              // For dynamically created components such as ComponentRef, we create a new TView for
              // each insert. This is not ideal since we should be sharing the TViews.
              // Also the logic here should be shared with `component.ts`'s `renderComponent`
              // method.
              tView.expandoStartIndex++;
              tView.blueprint.splice(++index + HEADER_OFFSET, 0, null);
              tView.data.splice(index + HEADER_OFFSET, 0, null);
              rootLView.splice(index + HEADER_OFFSET, 0, null);
            }
            const tNode = createNodeAtIndex(
              index,
              TNodeType.Element,
              nodeList[j] as RElement,
              null,
              null,
            );
            previousTNode ? (previousTNode.next = tNode) : (firstTNode = tNode);
            previousTNode = tNode;
          }
          projection.push(firstTNode!);
        }
      }

      // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
      // executed here?
      // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
      component = createRootComponent(
        componentView,
        this.componentDef,
        rootLView,
        rootContext,
        [LifecycleHooksFeature],
      );

      addToViewTree(rootLView, HEADER_OFFSET, componentView);
      refreshDescendantViews(rootLView);
    } finally {
      leaveView(oldLView);
      if (rendererFactory.end) rendererFactory.end();
    }

    const componentRef = new ComponentRef(
      this.componentType,
      component,
      createElementRef(viewEngine_ElementRef, tElementNode, rootLView),
      rootLView,
      tElementNode,
    );

    if (isInternalRootView) {
      // The host element of the internal root view is attached to the component's host view node
      componentRef.hostView._tViewNode!.child = tElementNode;
    }
    return componentRef;
  }
}

const componentFactoryResolver: ComponentFactoryResolver = new ComponentFactoryResolver();

/**
 * Creates a ComponentFactoryResolver and stores it on the injector. Or, if the
 * ComponentFactoryResolver
 * already exists, retrieves the existing ComponentFactoryResolver.
 *
 * @returns The ComponentFactoryResolver instance to use
 */
export function injectComponentFactoryResolver(): viewEngine_ComponentFactoryResolver {
  return componentFactoryResolver;
}

/**
 * Represents an instance of a Component created via a {@link ComponentFactory}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
 * method.
 *
 */
export class ComponentRef<T> extends viewEngine_ComponentRef<T> {
  destroyCbs: (() => void)[] | null = [];
  instance: T;
  hostView: ViewRef<T>;
  changeDetectorRef: ViewEngine_ChangeDetectorRef;
  componentType: Type<T>;

  constructor(
    componentType: Type<T>,
    instance: T,
    public location: viewEngine_ElementRef,
    private _rootLView: LView,
    private _tNode: TElementNode | TContainerNode | TElementContainerNode,
  ) {
    super();
    this.instance = instance;
    this.hostView = this.changeDetectorRef = new RootViewRef<T>(_rootLView);
    this.hostView._tViewNode = createViewNode(-1, _rootLView);
    this.componentType = componentType;
  }

  get injector(): Injector {
    return new NodeInjector(this._tNode, this._rootLView);
  }

  destroy(): void {
    ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed');
    this.destroyCbs!.forEach(fn => fn());
    this.destroyCbs = null;
    this.hostView.destroy();
  }
  onDestroy(callback: () => void): void {
    ngDevMode && assertDefined(this.destroyCbs, 'NgModule already destroyed');
    this.destroyCbs!.push(callback);
  }
}
