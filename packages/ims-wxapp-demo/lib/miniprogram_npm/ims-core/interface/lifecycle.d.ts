export interface OnBeforeDeleteProperty {
    onBeforeDeleteProperty(p: PropertyKey): PropertyKey;
}
export declare function hasOnBeforeDeleteProperty(val: any): val is OnBeforeDeleteProperty;
export interface OnDeleteProperty {
    OnDeleteProperty(p: PropertyKey): boolean;
}
export declare function hasOnDeleteProperty(val: any): val is OnDeleteProperty;
export interface OnBeforeGet {
    onBeforeGet(p: PropertyKey, receiver: any): [PropertyKey, any];
}
export declare function hasOnBeforeGet(val: any): val is OnBeforeGet;
export interface OnGet {
    onGet(p: PropertyKey, receiver: any): any;
}
export declare function hasOnGet(val: any): val is OnGet;
export interface OnBeforeHas {
    onBeforeHas(p: PropertyKey): any;
}
export declare function hasOnBeforeHas(val: any): val is OnBeforeHas;
export interface OnHas {
    onHas(p: PropertyKey): boolean;
}
export declare function hasOnHas(val: any): val is OnHas;
export interface OnBeforeSet {
    onBeforeSet(p: PropertyKey, value: any, receiver: any): [PropertyKey, any, any];
}
export declare function hasOnBeforeSet(val: any): val is OnBeforeSet;
export interface OnSet {
    OnSet(p: PropertyKey, value: any, receiver: any): boolean;
}
export declare function hasOnSet(val: any): val is OnSet;
export interface OnBeforeEnumerate {
    onBeforeEnumerate(): any;
}
export declare function hasOnBeforeEnumerate(val: any): val is OnBeforeEnumerate;
export interface OnEnumerate {
    OnEnumerate(): PropertyKey[];
}
export declare function hasOnEnumerate(val: any): val is OnEnumerate;
export interface OnBeforeOwnKeys {
    onBeforeOwnKeys(): any;
}
export declare function hasOnBeforeOwnKeys(val: any): val is OnBeforeOwnKeys;
export interface OnOwnKeys {
    OnOwnKeys(): PropertyKey[];
}
export declare function hasOnOwnKeys(val: any): val is OnOwnKeys;
export interface OnBeforeApply {
    onBeforeApply(thisArg: any, argArray?: any): any;
}
export declare function hasOnBeforeApply(val: any): val is OnBeforeApply;
export interface OnApply {
    OnApply(thisArg: any, argArray?: any): any;
}
export declare function hasOnApply(val: any): val is OnApply;
export interface OnBeforeConstruct {
    onBeforeConstruct(argArray: any, newTarget?: any): [any, any];
}
export declare function hasOnBeforeConstruct(val: any): val is OnBeforeConstruct;
export interface OnConstruct {
    OnConstruct(argArray: any, newTarget?: any): any;
}
export declare function hasOnConstruct(val: any): val is OnConstruct;
export interface OnBeforeGetOwnPropertyDescriptor {
    onBeforeGetOwnPropertyDescriptor(p: PropertyKey): any;
}
export declare function hasOnBeforeGetOwnPropertyDescriptor(val: any): val is OnBeforeGetOwnPropertyDescriptor;
export interface OnGetOwnPropertyDescriptor {
    onGetOwnPropertyDescriptor(p: PropertyKey): PropertyDescriptor;
}
export declare function hasOnGetOwnPropertyDescriptor(val: any): val is OnGetOwnPropertyDescriptor;
export interface OnBeforePreventExtensions {
    onBeforePreventExtensions(): object;
}
export declare function hasOnBeforePreventExtensions(val: any): val is OnBeforePreventExtensions;
export interface OnPreventExtensions {
    OnPreventExtensions(): boolean;
}
export declare function hasOnPreventExtensions(val: any): val is OnPreventExtensions;
export interface OnBeforeIsExtensible {
    onBeforeIsExtensible(): object;
}
export declare function hasOnBeforeIsExtensible(val: any): val is OnBeforeIsExtensible;
export interface OnIsExtensible {
    OnIsExtensible(): boolean;
}
export declare function hasOnIsExtensible(val: any): val is OnIsExtensible;
export interface OnBeforeSetPrototypeOf {
    onBeforeSetPrototypeOf(v: any): any;
}
export declare function hasOnBeforeSetPrototypeOf(val: any): val is OnBeforeSetPrototypeOf;
export interface OnSetPrototypeOf {
    OnSetPrototypeOf(v: any): boolean;
}
export declare function hasOnSetPrototypeOf(val: any): val is OnSetPrototypeOf;
export interface OnBeforeGetPrototypeOf {
    onBeforeGetPrototypeOf(): object;
}
export declare function hasOnBeforeGetPrototypeOf(val: any): val is OnBeforeGetPrototypeOf;
export interface OnGetPrototypeOf {
    OnGetPrototypeOf(): object;
}
export declare function hasOnGetPrototypeOf(val: any): val is OnGetPrototypeOf;
export interface OnDefineProperty {
    OnDefineProperty(p: PropertyKey, attributes: PropertyDescriptor): boolean;
}
export declare function hasOnDefineProperty(val: any): val is OnDefineProperty;
export interface OnBeforeDefineProperty {
    onBeforeDefineProperty(p: PropertyKey, attributes: PropertyDescriptor): [PropertyKey, PropertyDescriptor];
}
export declare function hasOnBeforeDefineProperty(val: any): val is OnBeforeDefineProperty;
