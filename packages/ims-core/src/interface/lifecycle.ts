import { strictIsFunction } from 'ims-util';

export interface OnBeforeDeleteProperty {
  onBeforeDeleteProperty(p: PropertyKey): PropertyKey;
}
export function hasOnBeforeDeleteProperty(
  val: any,
): val is OnBeforeDeleteProperty {
  return strictIsFunction(val, 'onBeforeDeleteProperty');
}
export interface OnDeleteProperty {
  OnDeleteProperty(p: PropertyKey): boolean;
}
export function hasOnDeleteProperty(val: any): val is OnDeleteProperty {
  return strictIsFunction(val, 'OnDeleteProperty');
}
export interface OnBeforeGet {
  onBeforeGet(p: PropertyKey, receiver: any): [PropertyKey, any];
}
export function hasOnBeforeGet(val: any): val is OnBeforeGet {
  return strictIsFunction(val, 'onBeforeGet');
}
export interface OnGet {
  onGet(p: PropertyKey, receiver: any): any;
}
export function hasOnGet(val: any): val is OnGet {
  return strictIsFunction(val, 'onGet');
}
export interface OnBeforeHas {
  onBeforeHas(p: PropertyKey): any;
}
export function hasOnBeforeHas(val: any): val is OnBeforeHas {
  return strictIsFunction(val, 'onBeforeHas');
}
export interface OnHas {
  onHas(p: PropertyKey): boolean;
}
export function hasOnHas(val: any): val is OnHas {
  return strictIsFunction(val, 'onHas');
}
export interface OnBeforeSet {
  onBeforeSet(
    p: PropertyKey,
    value: any,
    receiver: any,
  ): [PropertyKey, any, any];
}
export function hasOnBeforeSet(val: any): val is OnBeforeSet {
  return strictIsFunction(val, 'onBeforeSet');
}
export interface OnSet {
  OnSet(p: PropertyKey, value: any, receiver: any): boolean;
}
export function hasOnSet(val: any): val is OnSet {
  return strictIsFunction(val, 'OnSet');
}
export interface OnBeforeEnumerate {
  onBeforeEnumerate(): any;
}
export function hasOnBeforeEnumerate(val: any): val is OnBeforeEnumerate {
  return strictIsFunction(val, 'onBeforeEnumerate');
}
export interface OnEnumerate {
  OnEnumerate(): PropertyKey[];
}
export function hasOnEnumerate(val: any): val is OnEnumerate {
  return strictIsFunction(val, 'OnEnumerate');
}
export interface OnBeforeOwnKeys {
  onBeforeOwnKeys(): any;
}
export function hasOnBeforeOwnKeys(val: any): val is OnBeforeOwnKeys {
  return strictIsFunction(val, 'onBeforeOwnKeys');
}
export interface OnOwnKeys {
  OnOwnKeys(): PropertyKey[];
}
export function hasOnOwnKeys(val: any): val is OnOwnKeys {
  return strictIsFunction(val, 'OnOwnKeys');
}
export interface OnBeforeApply {
  onBeforeApply(thisArg: any, argArray?: any): any;
}
export function hasOnBeforeApply(val: any): val is OnBeforeApply {
  return strictIsFunction(val, 'onBeforeApply');
}
export interface OnApply {
  OnApply(thisArg: any, argArray?: any): any;
}
export function hasOnApply(val: any): val is OnApply {
  return strictIsFunction(val, 'OnApply');
}
export interface OnBeforeConstruct {
  onBeforeConstruct(argArray: any, newTarget?: any): [any, any];
}
export function hasOnBeforeConstruct(val: any): val is OnBeforeConstruct {
  return strictIsFunction(val, 'onBeforeConstruct');
}
export interface OnConstruct {
  OnConstruct(argArray: any, newTarget?: any): any;
}
export function hasOnConstruct(val: any): val is OnConstruct {
  return strictIsFunction(val, 'OnConstruct');
}
export interface OnBeforeGetOwnPropertyDescriptor {
  onBeforeGetOwnPropertyDescriptor(p: PropertyKey): any;
}
export function hasOnBeforeGetOwnPropertyDescriptor(
  val: any,
): val is OnBeforeGetOwnPropertyDescriptor {
  return strictIsFunction(val, 'onBeforeGetOwnPropertyDescriptor');
}
export interface OnGetOwnPropertyDescriptor {
  onGetOwnPropertyDescriptor(p: PropertyKey): PropertyDescriptor;
}
export function hasOnGetOwnPropertyDescriptor(
  val: any,
): val is OnGetOwnPropertyDescriptor {
  return strictIsFunction(val, 'onGetOwnPropertyDescriptor');
}
export interface OnBeforePreventExtensions {
  onBeforePreventExtensions(): object;
}
export function hasOnBeforePreventExtensions(
  val: any,
): val is OnBeforePreventExtensions {
  return strictIsFunction(val, 'onBeforePreventExtensions');
}
export interface OnPreventExtensions {
  OnPreventExtensions(): boolean;
}
export function hasOnPreventExtensions(val: any): val is OnPreventExtensions {
  return strictIsFunction(val, 'OnPreventExtensions');
}
export interface OnBeforeIsExtensible {
  onBeforeIsExtensible(): object;
}
export function hasOnBeforeIsExtensible(val: any): val is OnBeforeIsExtensible {
  return strictIsFunction(val, 'onBeforeIsExtensible');
}
export interface OnIsExtensible {
  OnIsExtensible(): boolean;
}
export function hasOnIsExtensible(val: any): val is OnIsExtensible {
  return strictIsFunction(val, 'OnIsExtensible');
}
export interface OnBeforeSetPrototypeOf {
  onBeforeSetPrototypeOf(v: any): any;
}
export function hasOnBeforeSetPrototypeOf(
  val: any,
): val is OnBeforeSetPrototypeOf {
  return strictIsFunction(val, 'onBeforeSetPrototypeOf');
}
export interface OnSetPrototypeOf {
  OnSetPrototypeOf(v: any): boolean;
}
export function hasOnSetPrototypeOf(val: any): val is OnSetPrototypeOf {
  return strictIsFunction(val, 'OnSetPrototypeOf');
}
export interface OnBeforeGetPrototypeOf {
  onBeforeGetPrototypeOf(): object;
}
export function hasOnBeforeGetPrototypeOf(
  val: any,
): val is OnBeforeGetPrototypeOf {
  return strictIsFunction(val, 'onBeforeGetPrototypeOf');
}
export interface OnGetPrototypeOf {
  OnGetPrototypeOf(): object;
}
export function hasOnGetPrototypeOf(val: any): val is OnGetPrototypeOf {
  return strictIsFunction(val, 'OnGetPrototypeOf');
}

export interface OnDefineProperty {
  OnDefineProperty(p: PropertyKey, attributes: PropertyDescriptor): boolean;
}
export function hasOnDefineProperty(val: any): val is OnDefineProperty {
  return strictIsFunction(val, 'OnDefineProperty');
}
export interface OnBeforeDefineProperty {
  onBeforeDefineProperty(
    p: PropertyKey,
    attributes: PropertyDescriptor,
  ): [PropertyKey, PropertyDescriptor];
}
export function hasOnBeforeDefineProperty(
  val: any,
): val is OnBeforeDefineProperty {
  return strictIsFunction(val, 'OnDefineProperty');
}
