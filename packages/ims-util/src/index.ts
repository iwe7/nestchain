import { isObservable, Observable, from, of, BehaviorSubject } from 'ims-rxjs';
import { isPromise } from './lang';
import { isFunction } from 'util';
export * from './compose';
export * from './lang';
export * from './table';
export * from './assign';
export * from './extend';
export * from './string';
export * from './global';
export * from './withIs';
export { default as merge, createMerge } from './merge';
export * from './stringify';
export * from './property';
export * from './staticError';
export * from './type';
export * from 'util';
export * from './other';
export * from './looper';
export * from './core';
export * from './init';
export * from './createObservableData';

export function toObservable(val: any): Observable<any> {
  try {
    if (isObservable(val)) {
      return val;
    }
    return from(val as any);
  } catch (e) {
    return of(val);
  }
}

export function isTypedPropertyDescriptor<T>(
  val: any,
): val is TypedPropertyDescriptor<T> {
  return val && typeof val === 'object';
}
export * from './life';
export * from './createFromData';

export async function toPromise<T>(val: any): Promise<T> {
  if (isPromise(val)) return (await val) as Promise<T>;
  if (isObservable(val)) return (await val.toPromise()) as Promise<T>;
  return val;
}

export function awaitify(asyncFn: any) {
  return new Proxy(asyncFn, {
    apply(target: any, thisArg: any, argArray?: any): any {
      if (isFunction2(argArray[argArray.length - 1])) {
        return Reflect.apply(target, thisArg, argArray);
      }
      return new Promise((resolve, reject) => {
        argArray[argArray.length] = (err: Error, ...cbArgs: any[]) => {
          if (err) return reject(err);
          resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
        };
        Reflect.apply(target, thisArg, argArray);
      });
    },
  });
}

function isFunction2(val: any): val is Function {
  return isFunction(val);
}
