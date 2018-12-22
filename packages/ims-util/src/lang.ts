import { Type } from 'ims-core';
import { Observable } from 'rxjs';
export type AllTypes =
  | 'array'
  | 'null'
  | 'undefined'
  | 'object'
  | 'number'
  | 'string'
  | 'symbol'
  | 'symbol'
  | 'boolean'
  | 'function'
  | 'regexp'
  | 'date'
  | 'arguments'
  | 'error'
  | 'weakmap'
  | 'map'
  | 'set'
  | 'weakset'
  | 'bigint';
export function getType(val: any): AllTypes {
  if (Array.isArray(val)) {
    return 'array';
  }
  if (val === null) {
    return 'null';
  }
  if (val === undefined || typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  const type = toString.call(val);
  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }
  return typeof val;
}

export function isNumber(v: any): v is number {
  if (getType(v) !== 'number') return false;
  return v - v + 1 >= 0;
}

export function isUndefined(v: any): v is undefined {
  return getType(v) === 'undefined';
}

export function isNull(v: any): v is null {
  return getType(v) === 'null';
}

export function isNullOrUndefined(v: any): v is undefined | null {
  return isUndefined(v) || isNull(v);
}

export const isArray = Array.isArray;
export function isObject(v: any): v is object {
  return getType(v) === 'object';
}

export function isFunction(v: any): v is Function {
  return getType(v) === 'function';
}

export function isEmpty(v: any): boolean {
  if (isNullOrUndefined(v)) return true;
  if (isString(v)) return v.length === 0;
  if (isArray(v)) return v.length === 0;
  if (isNumber(v)) return isNaN(v);
  if (isObject(v)) return Object.keys(v).length === 0;
  return false;
}

export function hasProperty(v: any, key: any): boolean {
  return Reflect.has(v, key);
}

export function getProperty(v: any, key: any): any {
  return Reflect.get(v, key);
}

export function strictGetProperty(v: any, key: any, _default?: any) {
  if (!isNullOrUndefined(v)) {
    if (!hasProperty(v, key)) {
      return getProperty(v, key);
    }
  }
  return _default;
}

export function setProperty(v: any, key: any, value: any): boolean {
  return Reflect.set(v, key, value);
}

export function strictsetProperty(v: any, key: any, value: any) {
  if (!isNullOrUndefined(v)) {
    if (!hasProperty(v, key)) {
      setProperty(v, key, value);
    }
  }
}

export function strictIsFunction(v: any, key: any) {
  if (isNullOrUndefined(v)) {
    return false;
  } else if (hasProperty(v, key)) {
    return isFunction(getProperty(v, key));
  } else {
    return false;
  }
}

export function strictIsArray(v: any, key: any) {
  if (isNullOrUndefined(v)) {
    return false;
  } else if (hasProperty(v, key)) {
    return isArray(getProperty(v, key));
  } else {
    return false;
  }
}

export function isObjectLike(v: any): v is object {
  return getType(v) === 'object';
}

export function isBoolean(v: any): v is boolean {
  return getType(v) === 'boolean';
}

export function isString(v: any): v is string {
  return getType(v) === 'string';
}

export function isOrigin(
  val: any = '',
): val is Function | String | Object | Array<any> | Date {
  if (val instanceof Function) {
    const { name } = val || ({} as any);
    return ['String', 'Number', 'Array', 'Object', 'Date'].indexOf(name) > -1;
  }
  return false;
}
export function getExtends(type: Type<any>): any | false {
  if (!type) {
    return false;
  }
  const prototypeOf = Reflect.getPrototypeOf(type) || {};
  const { name } = prototypeOf as any;
  if (isString(name)) {
    if (isOrigin(prototypeOf)) {
      return false;
    }
    if (name.length > 0) {
      return prototypeOf;
    }
  }
  return false;
}

export function isTrue(v: any): v is true {
  if (isNullOrUndefined(v)) return true;
  else if (isString(v)) return v === 'true' || v === '';
  else if (isBoolean(v)) return v;
  else if (isNumber(v)) return v !== 0;
  else return false;
}

export function isFalse(v: any): v is false {
  if (isNullOrUndefined(v)) return true;
  else if (isString(v)) return v === 'false' || v === '';
  else if (isBoolean(v)) return !v;
  else if (isNumber(v)) return v === 0;
  else return false;
}

export const keys = Object.keys;

export function uuid4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isPromise<T = any>(v: any): v is Promise<T> {
  return isFunction(v.then);
}

export function isObservable<T = any>(v: any): v is Observable<T> {
  return isFunction(v.subscribe);
}

export const isNaN = Number.isNaN;
export const isNan = Number.isNaN;

export function isMap<K = any, V = any>(v: any): v is Map<K, V> {
  return getType(v) === 'map';
}
export function isSet<V = any>(v: any): v is Set<V> {
  return getType(v) === 'set';
}
