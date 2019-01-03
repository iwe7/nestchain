/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectorRef as ViewEngine_ChangeDetectorRef } from '../change_detection/change_detector_ref';
import { Injector, NullInjector } from '../di/injector';
import {
  ComponentFactory as viewEngine_ComponentFactory,
  ComponentRef as viewEngine_ComponentRef,
} from '../linker/component_factory';
import { ElementRef as ViewEngine_ElementRef } from '../linker/element_ref';
import { NgModuleRef as viewEngine_NgModuleRef } from '../linker/ng_module_factory';
import { TemplateRef as ViewEngine_TemplateRef } from '../linker/template_ref';
import { ViewContainerRef as ViewEngine_ViewContainerRef } from '../linker/view_container_ref';
import {
  EmbeddedViewRef as viewEngine_EmbeddedViewRef,
  ViewRef as viewEngine_ViewRef,
} from '../linker/view_ref';
import { Renderer2 } from '../render/api';
import { assertDefined, assertGreaterThan, assertLessThan } from './assert';
import { NodeInjector, getParentInjectorLocation } from './di';
import {
  addToViewTree,
  createEmbeddedViewAndNode,
  createLContainer,
  renderEmbeddedTemplate,
} from './instructions';
import {
  ACTIVE_INDEX,
  LContainer,
  NATIVE,
  VIEWS,
} from './interfaces/container';
import { RenderFlags } from './interfaces/definition';
import {
  TContainerNode,
  TElementContainerNode,
  TElementNode,
  TNode,
  TNodeType,
  TViewNode,
} from './interfaces/node';
import { LQueries } from './interfaces/query';
import {
  RComment,
  RElement,
  Renderer3,
  isProceduralRenderer,
} from './interfaces/renderer';
import {
  CONTAINER_INDEX,
  CONTEXT,
  HOST_NODE,
  LView,
  QUERIES,
  RENDERER,
  TView,
} from './interfaces/view';
import { assertNodeOfPossibleTypes } from './node_assert';
import {
  addRemoveViewFromContainer,
  appendChild,
  detachView,
  getBeforeNodeForView,
  insertView,
  nativeInsertBefore,
  nativeNextSibling,
  nativeParentNode,
  removeView,
} from './node_manipulation';
import { getLView, getPreviousOrParentTNode } from './state';
import {
  findComponentView,
  getComponentViewByIndex,
  getNativeByTNode,
  getParentInjectorTNode,
  getParentInjectorView,
  hasParentInjector,
  isComponent,
  isLContainer,
  isRootView,
} from './util';
import { ViewRef } from './view_ref';

/**
 * Creates an ElementRef from the most recent node.
 *
 * @returns The ElementRef instance to use
 */
export function injectElementRef(
  ElementRefToken: typeof ViewEngine_ElementRef,
): ViewEngine_ElementRef {
  return createElementRef(
    ElementRefToken,
    getPreviousOrParentTNode(),
    getLView(),
  );
}

let R3ElementRef: { new (native: RElement | RComment): ViewEngine_ElementRef };

/**
 * Creates an ElementRef given a node.
 *
 * @param ElementRefToken The ElementRef type
 * @param tNode The node for which you'd like an ElementRef
 * @param view The view to which the node belongs
 * @returns The ElementRef instance to use
 */
export function createElementRef(
  ElementRefToken: typeof ViewEngine_ElementRef,
  tNode: TNode,
  view: LView,
): ViewEngine_ElementRef {
  if (!R3ElementRef) {
    // TODO: Fix class name, should be ElementRef, but there appears to be a rollup bug
    R3ElementRef = class ElementRef_ extends ElementRefToken {};
  }
  return new R3ElementRef(getNativeByTNode(tNode, view));
}

let R3TemplateRef: {
  new (
    _declarationParentView: LView,
    elementRef: ViewEngine_ElementRef,
    _tView: TView,
    _renderer: Renderer3,
    _queries: LQueries | null,
    _injectorIndex: number,
  ): ViewEngine_TemplateRef<any>;
};

/**
 * Creates a TemplateRef given a node.
 *
 * @returns The TemplateRef instance to use
 */
export function injectTemplateRef<T>(
  TemplateRefToken: typeof ViewEngine_TemplateRef,
  ElementRefToken: typeof ViewEngine_ElementRef,
): ViewEngine_TemplateRef<T> | null {
  return createTemplateRef<T>(
    TemplateRefToken,
    ElementRefToken,
    getPreviousOrParentTNode(),
    getLView(),
  );
}

/**
 * Creates a TemplateRef and stores it on the injector.
 *
 * @param TemplateRefToken The TemplateRef type
 * @param ElementRefToken The ElementRef type
 * @param hostTNode The node that is requesting a TemplateRef
 * @param hostView The view to which the node belongs
 * @returns The TemplateRef instance to use
 */
export function createTemplateRef<T>(
  TemplateRefToken: typeof ViewEngine_TemplateRef,
  ElementRefToken: typeof ViewEngine_ElementRef,
  hostTNode: TNode,
  hostView: LView,
): ViewEngine_TemplateRef<T> | null {
  if (!R3TemplateRef) {
    // TODO: Fix class name, should be TemplateRef, but there appears to be a rollup bug
    R3TemplateRef = class TemplateRef_<T> extends TemplateRefToken<T> {
      constructor(
        private _declarationParentView: LView,
        readonly elementRef: ViewEngine_ElementRef,
        private _tView: TView,
        private _renderer: Renderer3,
        private _queries: LQueries | null,
        private _injectorIndex: number,
      ) {
        super();
      }

      createEmbeddedView(
        context: T,
        container?: LContainer,
        hostTNode?: TElementNode | TContainerNode | TElementContainerNode,
        hostView?: LView,
        index?: number,
      ): viewEngine_EmbeddedViewRef<T> {
        const lView = createEmbeddedViewAndNode(
          this._tView,
          context,
          this._declarationParentView,
          this._renderer,
          this._queries,
          this._injectorIndex,
        );
        if (container) {
          insertView(lView, container, hostView!, index!, hostTNode!.index);
        }
        renderEmbeddedTemplate(lView, this._tView, context);
        const viewRef = new ViewRef(lView, context, -1);
        viewRef._tViewNode = lView[HOST_NODE] as TViewNode;
        return viewRef;
      }
    };
  }

  if (hostTNode.type === TNodeType.Container) {
    const hostContainer: LContainer = hostView[hostTNode.index];
    ngDevMode && assertDefined(hostTNode.tViews, 'TView must be allocated');
    return new R3TemplateRef(
      hostView,
      createElementRef(ElementRefToken, hostTNode, hostView),
      hostTNode.tViews as TView,
      getLView()[RENDERER],
      hostContainer[QUERIES],
      hostTNode.injectorIndex,
    );
  } else {
    return null;
  }
}

let R3ViewContainerRef: {
  new (
    lContainer: LContainer,
    hostTNode: TElementNode | TContainerNode | TElementContainerNode,
    hostView: LView,
  ): ViewEngine_ViewContainerRef;
};

/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @returns The ViewContainerRef instance to use
 */
export function injectViewContainerRef(
  ViewContainerRefToken: typeof ViewEngine_ViewContainerRef,
  ElementRefToken: typeof ViewEngine_ElementRef,
): ViewEngine_ViewContainerRef {
  const previousTNode = getPreviousOrParentTNode() as
    | TElementNode
    | TElementContainerNode
    | TContainerNode;
  return createContainerRef(
    ViewContainerRefToken,
    ElementRefToken,
    previousTNode,
    getLView(),
  );
}

/**
 * Creates a ViewContainerRef and stores it on the injector.
 *
 * @param ViewContainerRefToken The ViewContainerRef type
 * @param ElementRefToken The ElementRef type
 * @param hostTNode The node that is requesting a ViewContainerRef
 * @param hostView The view to which the node belongs
 * @returns The ViewContainerRef instance to use
 */
export function createContainerRef(
  ViewContainerRefToken: typeof ViewEngine_ViewContainerRef,
  ElementRefToken: typeof ViewEngine_ElementRef,
  hostTNode: TElementNode | TContainerNode | TElementContainerNode,
  hostView: LView,
): ViewEngine_ViewContainerRef {
  if (!R3ViewContainerRef) {
    // TODO: Fix class name, should be ViewContainerRef, but there appears to be a rollup bug
    R3ViewContainerRef = class ViewContainerRef_ extends ViewContainerRefToken {
      private _viewRefs: viewEngine_ViewRef[] = [];

      constructor(
        private _lContainer: LContainer,
        private _hostTNode:
          | TElementNode
          | TContainerNode
          | TElementContainerNode,
        private _hostView: LView,
      ) {
        super();
      }

      get element(): ViewEngine_ElementRef {
        return createElementRef(
          ElementRefToken,
          this._hostTNode,
          this._hostView,
        );
      }

      get injector(): Injector {
        return new NodeInjector(this._hostTNode, this._hostView);
      }

      /** @deprecated No replacement */
      get parentInjector(): Injector {
        const parentLocation = getParentInjectorLocation(
          this._hostTNode,
          this._hostView,
        );
        const parentView = getParentInjectorView(
          parentLocation,
          this._hostView,
        );
        const parentTNode = getParentInjectorTNode(
          parentLocation,
          this._hostView,
          this._hostTNode,
        );

        return !hasParentInjector(parentLocation) || parentTNode == null
          ? new NullInjector()
          : new NodeInjector(parentTNode, parentView);
      }

      clear(): void {
        while (this._lContainer[VIEWS].length) {
          this.remove(0);
        }
      }

      get(index: number): viewEngine_ViewRef | null {
        return this._viewRefs[index] || null;
      }

      get length(): number {
        return this._lContainer[VIEWS].length;
      }

      createEmbeddedView<C>(
        templateRef: ViewEngine_TemplateRef<C>,
        context?: C,
        index?: number,
      ): viewEngine_EmbeddedViewRef<C> {
        const adjustedIdx = this._adjustIndex(index);
        const viewRef = (templateRef as any).createEmbeddedView(
          context || <any>{},
          this._lContainer,
          this._hostTNode,
          this._hostView,
          adjustedIdx,
        );
        (viewRef as ViewRef<any>).attachToViewContainerRef(this);
        this._viewRefs.splice(adjustedIdx, 0, viewRef);
        return viewRef;
      }

      createComponent<C>(
        componentFactory: viewEngine_ComponentFactory<C>,
        index?: number | undefined,
        injector?: Injector | undefined,
        projectableNodes?: any[][] | undefined,
        ngModuleRef?: viewEngine_NgModuleRef<any> | undefined,
      ): viewEngine_ComponentRef<C> {
        const contextInjector = injector || this.parentInjector;
        if (
          !ngModuleRef &&
          (componentFactory as any).ngModule == null &&
          contextInjector
        ) {
          ngModuleRef = contextInjector.get(viewEngine_NgModuleRef, null);
        }

        const componentRef = componentFactory.create(
          contextInjector,
          projectableNodes,
          undefined,
          ngModuleRef,
        );
        this.insert(componentRef.hostView, index);
        return componentRef;
      }

      insert(viewRef: viewEngine_ViewRef, index?: number): viewEngine_ViewRef {
        if (viewRef.destroyed) {
          throw new Error('Cannot insert a destroyed View in a ViewContainer!');
        }
        const lView = (viewRef as ViewRef<any>)._lView!;
        const adjustedIdx = this._adjustIndex(index);

        insertView(
          lView,
          this._lContainer,
          this._hostView,
          adjustedIdx,
          this._hostTNode.index,
        );

        const beforeNode = getBeforeNodeForView(
          adjustedIdx,
          this._lContainer[VIEWS],
          this._lContainer[NATIVE],
        );
        addRemoveViewFromContainer(lView, true, beforeNode);

        (viewRef as ViewRef<any>).attachToViewContainerRef(this);
        this._viewRefs.splice(adjustedIdx, 0, viewRef);

        return viewRef;
      }

      move(viewRef: viewEngine_ViewRef, newIndex: number): viewEngine_ViewRef {
        if (viewRef.destroyed) {
          throw new Error('Cannot move a destroyed View in a ViewContainer!');
        }
        const index = this.indexOf(viewRef);
        this.detach(index);
        this.insert(viewRef, this._adjustIndex(newIndex));
        return viewRef;
      }

      indexOf(viewRef: viewEngine_ViewRef): number {
        return this._viewRefs.indexOf(viewRef);
      }

      remove(index?: number): void {
        const adjustedIdx = this._adjustIndex(index, -1);
        removeView(this._lContainer, this._hostTNode, adjustedIdx);
        this._viewRefs.splice(adjustedIdx, 1);
      }

      detach(index?: number): viewEngine_ViewRef | null {
        const adjustedIdx = this._adjustIndex(index, -1);
        const view = detachView(
          this._lContainer,
          adjustedIdx,
          !!this._hostTNode.detached,
        );
        const wasDetached = this._viewRefs.splice(adjustedIdx, 1)[0] != null;
        return wasDetached
          ? new ViewRef(view, view[CONTEXT], view[CONTAINER_INDEX])
          : null;
      }

      private _adjustIndex(index?: number, shift: number = 0) {
        if (index == null) {
          return this._lContainer[VIEWS].length + shift;
        }
        if (ngDevMode) {
          assertGreaterThan(index, -1, 'index must be positive');
          // +1 because it's legal to insert at the end.
          assertLessThan(
            index,
            this._lContainer[VIEWS].length + 1 + shift,
            'index',
          );
        }
        return index;
      }
    };
  }

  ngDevMode &&
    assertNodeOfPossibleTypes(
      hostTNode,
      TNodeType.Container,
      TNodeType.Element,
      TNodeType.ElementContainer,
    );

  let lContainer: LContainer;
  const slotValue = hostView[hostTNode.index];
  if (isLContainer(slotValue)) {
    // If the host is a container, we don't need to create a new LContainer
    lContainer = slotValue;
    lContainer[ACTIVE_INDEX] = -1;
  } else {
    const commentNode = hostView[RENDERER].createComment(
      ngDevMode ? 'container' : '',
    );
    ngDevMode && ngDevMode.rendererCreateComment++;

    // A container can be created on the root (topmost / bootstrapped) component and in this case we
    // can't use LTree to insert container's marker node (both parent of a comment node and the
    // commend node itself is located outside of elements hold by LTree). In this specific case we
    // use low-level DOM manipulation to insert container's marker (comment) node.
    if (isRootView(hostView)) {
      const renderer = hostView[RENDERER];
      const hostNative = getNativeByTNode(hostTNode, hostView)!;
      const parentOfHostNative = nativeParentNode(renderer, hostNative);
      nativeInsertBefore(
        renderer,
        parentOfHostNative!,
        commentNode,
        nativeNextSibling(renderer, hostNative),
      );
    } else {
      appendChild(commentNode, hostTNode, hostView);
    }

    hostView[hostTNode.index] = lContainer = createLContainer(
      slotValue,
      hostTNode,
      hostView,
      commentNode,
      true,
    );

    addToViewTree(hostView, hostTNode.index as number, lContainer);
  }

  return new R3ViewContainerRef(lContainer, hostTNode, hostView);
}

/** Returns a ChangeDetectorRef (a.k.a. a ViewRef) */
export function injectChangeDetectorRef(): ViewEngine_ChangeDetectorRef {
  return createViewRef(getPreviousOrParentTNode(), getLView(), null);
}

/**
 * Creates a ViewRef and stores it on the injector as ChangeDetectorRef (public alias).
 *
 * @param hostTNode The node that is requesting a ChangeDetectorRef
 * @param hostView The view to which the node belongs
 * @param context The context for this change detector ref
 * @returns The ChangeDetectorRef to use
 */
export function createViewRef(
  hostTNode: TNode,
  hostView: LView,
  context: any,
): ViewEngine_ChangeDetectorRef {
  if (isComponent(hostTNode)) {
    const componentIndex = hostTNode.directiveStart;
    const componentView = getComponentViewByIndex(hostTNode.index, hostView);
    return new ViewRef(componentView, context, componentIndex);
  } else if (hostTNode.type === TNodeType.Element) {
    const hostComponentView = findComponentView(hostView);
    return new ViewRef(hostComponentView, hostComponentView[CONTEXT], -1);
  }
  return null!;
}

function getOrCreateRenderer2(view: LView): Renderer2 {
  const renderer = view[RENDERER];
  if (isProceduralRenderer(renderer)) {
    return renderer as Renderer2;
  } else {
    throw new Error(
      'Cannot inject Renderer2 when the application uses Renderer3!',
    );
  }
}

/** Returns a Renderer2 (or throws when application was bootstrapped with Renderer3) */
export function injectRenderer2(): Renderer2 {
  return getOrCreateRenderer2(getLView());
}
