/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ApplicationRef } from '../application_ref';
import { ChangeDetectorRef as viewEngine_ChangeDetectorRef } from '../change_detection/change_detector_ref';
import { ViewContainerRef as viewEngine_ViewContainerRef } from '../linker/view_container_ref';
import {
  EmbeddedViewRef as viewEngine_EmbeddedViewRef,
  InternalViewRef as viewEngine_InternalViewRef,
} from '../linker/view_ref';

import {
  checkNoChanges,
  checkNoChangesInRootView,
  checkView,
  detectChangesInRootView,
  detectChangesInternal,
  markViewDirty,
  storeCleanupFn,
  viewAttached,
} from './instructions';
import { TNode, TNodeType, TViewNode } from './interfaces/node';
import {
  FLAGS,
  HOST,
  HOST_NODE,
  LView,
  LViewFlags,
  PARENT,
  RENDERER_FACTORY,
} from './interfaces/view';
import { destroyLView } from './node_manipulation';
import { getNativeByTNode } from './util';

// Needed due to tsickle downleveling where multiple `implements` with classes creates
// multiple @extends in Closure annotations, which is illegal. This workaround fixes
// the multiple @extends by making the annotation @implements instead
export interface viewEngine_ChangeDetectorRef_interface
  extends viewEngine_ChangeDetectorRef {}

export class ViewRef<T>
  implements
    viewEngine_EmbeddedViewRef<T>,
    viewEngine_InternalViewRef,
    viewEngine_ChangeDetectorRef_interface {
  private _appRef: ApplicationRef | null = null;
  private _viewContainerRef: viewEngine_ViewContainerRef | null = null;

  /**
   * @internal
   */
  public _tViewNode: TViewNode | null = null;

  /**
   * @internal
   */
  public _lView: LView;

  get rootNodes(): any[] {
    if (this._lView[HOST] == null) {
      const tView = this._lView[HOST_NODE] as TViewNode;
      return collectNativeNodes(this._lView, tView, []);
    }
    return [];
  }

  constructor(
    _lView: LView,
    private _context: T | null,
    private _componentIndex: number,
  ) {
    this._lView = _lView;
  }

  get context(): T {
    return this._context ? this._context : this._lookUpContext();
  }

  get destroyed(): boolean {
    return (this._lView[FLAGS] & LViewFlags.Destroyed) === LViewFlags.Destroyed;
  }

  destroy(): void {
    if (this._appRef) {
      this._appRef.detachView(this);
    } else if (this._viewContainerRef) {
      const index = this._viewContainerRef.indexOf(this);

      if (index > -1) {
        this._viewContainerRef.detach(index);
      }

      this._viewContainerRef = null;
    }
    destroyLView(this._lView);
  }

  onDestroy(callback: Function) {
    storeCleanupFn(this._lView, callback);
  }

  /**
   * Marks a view and all of its ancestors dirty.
   *
   * It also triggers change detection by calling `scheduleTick` internally, which coalesces
   * multiple `markForCheck` calls to into one change detection run.
   *
   * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush OnPush} component is
   * checked when it needs to be re-rendered but the two normal triggers haven't marked it
   * dirty (i.e. inputs haven't changed and events haven't fired in the view).
   *
   * <!-- TODO: Add a link to a chapter on OnPush components -->
   *
   * @usageNotes
   * ### Example
   *
   * ```typescript
   * @Component({
   *   selector: 'my-app',
   *   template: `Number of ticks: {{numberOfTicks}}`
   *   changeDetection: ChangeDetectionStrategy.OnPush,
   * })
   * class AppComponent {
   *   numberOfTicks = 0;
   *
   *   constructor(private ref: ChangeDetectorRef) {
   *     setInterval(() => {
   *       this.numberOfTicks++;
   *       // the following is required, otherwise the view will not be updated
   *       this.ref.markForCheck();
   *     }, 1000);
   *   }
   * }
   * ```
   */
  markForCheck(): void {
    markViewDirty(this._lView);
  }

  /**
   * Detaches the view from the change detection tree.
   *
   * Detached views will not be checked during change detection runs until they are
   * re-attached, even if they are dirty. `detach` can be used in combination with
   * {@link ChangeDetectorRef#detectChanges detectChanges} to implement local change
   * detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds. We can do that by detaching
   * the component's change detector and doing a local check every five seconds.
   *
   * ```typescript
   * class DataProvider {
   *   // in a real application the returned data will be different every time
   *   get data() {
   *     return [1,2,3,4,5];
   *   }
   * }
   *
   * @Component({
   *   selector: 'giant-list',
   *   template: `
   *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
   *   `,
   * })
   * class GiantList {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
   *     ref.detach();
   *     setInterval(() => {
   *       this.ref.detectChanges();
   *     }, 5000);
   *   }
   * }
   *
   * @Component({
   *   selector: 'app',
   *   providers: [DataProvider],
   *   template: `
   *     <giant-list><giant-list>
   *   `,
   * })
   * class App {
   * }
   * ```
   */
  detach(): void {
    this._lView[FLAGS] &= ~LViewFlags.Attached;
  }

  /**
   * Re-attaches a view to the change detection tree.
   *
   * This can be used to re-attach views that were previously detached from the tree
   * using {@link ChangeDetectorRef#detach detach}. Views are attached to the tree by default.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example creates a component displaying `live` data. The component will detach
   * its change detector from the main change detector tree when the component's live property
   * is set to false.
   *
   * ```typescript
   * class DataProvider {
   *   data = 1;
   *
   *   constructor() {
   *     setInterval(() => {
   *       this.data = this.data * 2;
   *     }, 500);
   *   }
   * }
   *
   * @Component({
   *   selector: 'live-data',
   *   inputs: ['live'],
   *   template: 'Data: {{dataProvider.data}}'
   * })
   * class LiveData {
   *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
   *
   *   set live(value) {
   *     if (value) {
   *       this.ref.reattach();
   *     } else {
   *       this.ref.detach();
   *     }
   *   }
   * }
   *
   * @Component({
   *   selector: 'my-app',
   *   providers: [DataProvider],
   *   template: `
   *     Live Update: <input type="checkbox" [(ngModel)]="live">
   *     <live-data [live]="live"><live-data>
   *   `,
   * })
   * class AppComponent {
   *   live = true;
   * }
   * ```
   */
  reattach(): void {
    this._lView[FLAGS] |= LViewFlags.Attached;
  }

  /**
   * Checks the view and its children.
   *
   * This can also be used in combination with {@link ChangeDetectorRef#detach detach} to implement
   * local change detection checks.
   *
   * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
   * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
   *
   * @usageNotes
   * ### Example
   *
   * The following example defines a component with a large list of readonly data.
   * Imagine, the data changes constantly, many times per second. For performance reasons,
   * we want to check and update the list every five seconds.
   *
   * We can do that by detaching the component's change detector and doing a local change detection
   * check every five seconds.
   *
   * See {@link ChangeDetectorRef#detach detach} for more information.
   */
  detectChanges(): void {
    detectChangesInternal(this._lView, this.context);
  }

  /**
   * Checks the change detector and its children, and throws if any changes are detected.
   *
   * This is used in development mode to verify that running change detection doesn't
   * introduce other changes.
   */
  checkNoChanges(): void {
    checkNoChanges(this.context);
  }

  attachToViewContainerRef(vcRef: viewEngine_ViewContainerRef) {
    if (this._appRef) {
      throw new Error(
        'This view is already attached directly to the ApplicationRef!',
      );
    }
    this._viewContainerRef = vcRef;
  }

  detachFromAppRef() {
    this._appRef = null;
  }

  attachToAppRef(appRef: ApplicationRef) {
    if (this._viewContainerRef) {
      throw new Error('This view is already attached to a ViewContainer!');
    }
    this._appRef = appRef;
  }

  private _lookUpContext(): T {
    return (this._context = this._lView[PARENT]![this._componentIndex] as T);
  }
}

/** @internal */
export class RootViewRef<T> extends ViewRef<T> {
  constructor(public _view: LView) {
    super(_view, null, -1);
  }

  detectChanges(): void {
    detectChangesInRootView(this._view);
  }

  checkNoChanges(): void {
    checkNoChangesInRootView(this._view);
  }

  get context(): T {
    return null!;
  }
}

function collectNativeNodes(
  lView: LView,
  parentTNode: TNode,
  result: any[],
): any[] {
  let tNodeChild = parentTNode.child;

  while (tNodeChild) {
    result.push(getNativeByTNode(tNodeChild, lView));
    if (tNodeChild.type === TNodeType.ElementContainer) {
      collectNativeNodes(lView, tNodeChild, result);
    }
    tNodeChild = tNodeChild.next;
  }

  return result;
}
