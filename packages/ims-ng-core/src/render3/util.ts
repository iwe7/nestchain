/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { global } from '../util';

import {
  assertDataInRange,
  assertDefined,
  assertGreaterThan,
  assertLessThan,
} from './assert';
import {
  ACTIVE_INDEX,
  LCONTAINER_LENGTH,
  LContainer,
} from './interfaces/container';
import { LContext, MONKEY_PATCH_KEY_NAME } from './interfaces/context';
import { ComponentDef, DirectiveDef } from './interfaces/definition';
import {
  NO_PARENT_INJECTOR,
  RelativeInjectorLocation,
  RelativeInjectorLocationFlags,
} from './interfaces/injector';
import {
  TContainerNode,
  TElementNode,
  TNode,
  TNodeFlags,
  TNodeType,
} from './interfaces/node';
import { RComment, RElement, RText } from './interfaces/renderer';
import { StylingContext } from './interfaces/styling';
import {
  CONTEXT,
  DECLARATION_VIEW,
  FLAGS,
  HEADER_OFFSET,
  HOST,
  HOST_NODE,
  LView,
  LViewFlags,
  PARENT,
  RootContext,
  TData,
  TVIEW,
  TView,
} from './interfaces/view';

/**
 * Returns whether the values are different from a change detection stand point.
 *
 * Constraints are relaxed in checkNoChanges mode. See `devModeEqual` for details.
 */
export function isDifferent(a: any, b: any): boolean {
  // NaN is the only value that is not equal to itself so the first
  // test checks if both a and b are not NaN
  return !(a !== a && b !== b) && a !== b;
}

export function stringify(value: any): string {
  if (typeof value == 'function') return value.name || value;
  if (typeof value == 'string') return value;
  if (value == null) return '';
  if (typeof value == 'object' && typeof value.type == 'function')
    return value.type.name || value.type;
  return '' + value;
}

/**
 * Flattens an array in non-recursive way. Input arrays are not modified.
 */
export function flatten(list: any[]): any[] {
  const result: any[] = [];
  let i = 0;

  while (i < list.length) {
    const item = list[i];
    if (Array.isArray(item)) {
      if (item.length > 0) {
        list = item.concat(list.slice(i + 1));
        i = 0;
      } else {
        i++;
      }
    } else {
      result.push(item);
      i++;
    }
  }

  return result;
}

/** Retrieves a value from any `LView` or `TData`. */
export function loadInternal<T>(view: LView | TData, index: number): T {
  ngDevMode && assertDataInRange(view, index + HEADER_OFFSET);
  return view[index + HEADER_OFFSET];
}

/**
 * Takes the value of a slot in `LView` and returns the element node.
 *
 * Normally, element nodes are stored flat, but if the node has styles/classes on it,
 * it might be wrapped in a styling context. Or if that node has a directive that injects
 * ViewContainerRef, it may be wrapped in an LContainer. Or if that node is a component,
 * it will be wrapped in LView. It could even have all three, so we keep looping
 * until we find something that isn't an array.
 *
 * @param value The initial value in `LView`
 */
export function readElementValue(
  value: RElement | StylingContext | LContainer | LView,
): RElement {
  while (Array.isArray(value)) {
    value = value[HOST] as any;
  }
  return value;
}

/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 */
export function getNativeByIndex(index: number, lView: LView): RElement {
  return readElementValue(lView[index + HEADER_OFFSET]);
}

export function getNativeByTNode(
  tNode: TNode,
  hostView: LView,
): RElement | RText | RComment {
  return readElementValue(hostView[tNode.index]);
}

export function getTNode(index: number, view: LView): TNode {
  ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
  ngDevMode &&
    assertLessThan(index, view[TVIEW].data.length, 'wrong index for TNode');
  return view[TVIEW].data[index + HEADER_OFFSET] as TNode;
}

export function getComponentViewByIndex(
  nodeIndex: number,
  hostView: LView,
): LView {
  // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
  const slotValue = hostView[nodeIndex];
  return slotValue.length >= HEADER_OFFSET ? slotValue : slotValue[HOST];
}

export function isContentQueryHost(tNode: TNode): boolean {
  return (tNode.flags & TNodeFlags.hasContentQuery) !== 0;
}

export function isComponent(tNode: TNode): boolean {
  return (tNode.flags & TNodeFlags.isComponent) === TNodeFlags.isComponent;
}

export function isComponentDef<T>(
  def: DirectiveDef<T>,
): def is ComponentDef<T> {
  return (def as ComponentDef<T>).template !== null;
}

export function isLContainer(
  value: RElement | RComment | LContainer | StylingContext,
): boolean {
  // Styling contexts are also arrays, but their first index contains an element node
  return Array.isArray(value) && value.length === LCONTAINER_LENGTH;
}

export function isRootView(target: LView): boolean {
  return (target[FLAGS] & LViewFlags.IsRoot) !== 0;
}

/**
 * Retrieve the root view from any component by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param component any component
 */
export function getRootView(target: LView | {}): LView {
  ngDevMode && assertDefined(target, 'component');
  let lView = Array.isArray(target)
    ? (target as LView)
    : readPatchedLView(target)!;
  while (lView && !(lView[FLAGS] & LViewFlags.IsRoot)) {
    lView = lView[PARENT]!;
  }
  return lView;
}

export function getRootContext(viewOrComponent: LView | {}): RootContext {
  const rootView = getRootView(viewOrComponent);
  ngDevMode &&
    assertDefined(
      rootView[CONTEXT],
      'RootView has no context. Perhaps it is disconnected?',
    );
  return rootView[CONTEXT] as RootContext;
}

/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
export function readPatchedData(target: any): LView | LContext | null {
  ngDevMode && assertDefined(target, 'Target expected');
  return target[MONKEY_PATCH_KEY_NAME];
}

export function readPatchedLView(target: any): LView | null {
  const value = readPatchedData(target);
  if (value) {
    return Array.isArray(value) ? value : (value as LContext).lView;
  }
  return null;
}

export function hasParentInjector(
  parentLocation: RelativeInjectorLocation,
): boolean {
  return parentLocation !== NO_PARENT_INJECTOR;
}

export function getParentInjectorIndex(
  parentLocation: RelativeInjectorLocation,
): number {
  return (
    ((parentLocation as any) as number) &
    RelativeInjectorLocationFlags.InjectorIndexMask
  );
}

export function getParentInjectorViewOffset(
  parentLocation: RelativeInjectorLocation,
): number {
  return (
    ((parentLocation as any) as number) >>
    RelativeInjectorLocationFlags.ViewOffsetShift
  );
}

/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @returns The LView instance that contains the parent injector
 */
export function getParentInjectorView(
  location: RelativeInjectorLocation,
  startView: LView,
): LView {
  let viewOffset = getParentInjectorViewOffset(location);
  let parentView = startView;
  // For most cases, the parent injector can be found on the host node (e.g. for component
  // or container), but we must keep the loop here to support the rarer case of deeply nested
  // <ng-template> tags or inline views, where the parent injector might live many views
  // above the child injector.
  while (viewOffset > 0) {
    parentView = parentView[DECLARATION_VIEW]!;
    viewOffset--;
  }
  return parentView;
}

/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the TNode of the parent injector is found.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @param startTNode The TNode instance of the starting element
 * @returns The TNode of the parent injector
 */
export function getParentInjectorTNode(
  location: RelativeInjectorLocation,
  startView: LView,
  startTNode: TNode,
): TElementNode | TContainerNode | null {
  if (startTNode.parent && startTNode.parent.injectorIndex !== -1) {
    // view offset is 0
    const injectorIndex = startTNode.parent.injectorIndex;
    let parentTNode = startTNode.parent;
    while (
      parentTNode.parent != null &&
      injectorIndex == parentTNode.injectorIndex
    ) {
      parentTNode = parentTNode.parent;
    }
    return parentTNode;
  }

  let viewOffset = getParentInjectorViewOffset(location);
  // view offset is 1
  let parentView = startView;
  let parentTNode = startView[HOST_NODE] as TElementNode;

  // view offset is superior to 1
  while (viewOffset > 1) {
    parentView = parentView[DECLARATION_VIEW]!;
    parentTNode = parentView[HOST_NODE] as TElementNode;
    viewOffset--;
  }
  return parentTNode;
}

export const defaultScheduler = (
  (typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame) || // browser only
  setTimeout
) // everything else
  .bind(global);

/**
 * Equivalent to ES6 spread, add each item to an array.
 *
 * @param items The items to add
 * @param arr The array to which you want to add the items
 */
export function addAllToArray(items: any[], arr: any[]) {
  for (let i = 0; i < items.length; i++) {
    arr.push(items[i]);
  }
}

/**
 * Given a current view, finds the nearest component's host (LElement).
 *
 * @param lView LView for which we want a host element node
 * @param declarationMode indicates whether DECLARATION_VIEW or PARENT should be used to climb the
 * tree.
 * @returns The host node
 */
export function findComponentView(
  lView: LView,
  declarationMode?: boolean,
): LView {
  let rootTNode = lView[HOST_NODE];

  while (rootTNode && rootTNode.type === TNodeType.View) {
    ngDevMode &&
      assertDefined(
        lView[declarationMode ? DECLARATION_VIEW : PARENT],
        declarationMode ? 'lView.declarationView' : 'lView.parent',
      );
    lView = lView[declarationMode ? DECLARATION_VIEW : PARENT]!;
    rootTNode = lView[HOST_NODE];
  }

  return lView;
}

/**
 * Return the host TElementNode of the starting LView
 * @param lView the starting LView.
 */
export function getHostTElementNode(lView: LView): TElementNode | null {
  return findComponentView(lView, true)[HOST_NODE] as TElementNode;
}
