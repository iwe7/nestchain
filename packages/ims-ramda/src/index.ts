import { Observable } from 'ims-rxjs';

export function p(...args: any[]) {
  return <T>(fn: Function) =>
    new Promise<T>((resolve, reject) => {
      fn(...args, (err: Error, data: T) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
}
export interface IErrorCallback<T> {
  (err: Error, data: T): void;
}
export interface IFunction<T> {
  (callback: IErrorCallback<T>): any;
  (arg1: any, callback: IErrorCallback<T>): any;
  (arg1: any, arg2: any, callback: IErrorCallback<T>): any;
  (arg1: any, arg2: any, arg3: any, callback: IErrorCallback<T>): any;
  (
    arg1: any,
    arg2: any,
    arg3: any,
    arg4: any,
    callback: IErrorCallback<T>,
  ): any;
  (
    arg1: any,
    arg2: any,
    arg3: any,
    arg4: any,
    arg5: any,
    callback: IErrorCallback<T>,
  ): any;
  (
    arg1: any,
    arg2: any,
    arg3: any,
    arg4: any,
    arg5: any,
    arg6: any,
    callback: IErrorCallback<T>,
  ): any;
}

export function toPromise<T>(fn: IFunction<T>): (...args: any[]) => Promise<T> {
  return (...args: any[]) =>
    new Promise<T>((resolve, reject) => {
      fn(...args, (err: Error, data: T) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
}

export function ip<T>(fn: Function) {
  return (...args: any[]) =>
    new Promise<T>((resolve, reject) => {
      fn(...args, (err: Error, data: T) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
}

export function o(...args: any[]) {
  return <T>(fn: Function) =>
    new Observable<T>(obs => {
      fn(...args, (err: Error, data: T) => {
        if (err) return obs.error(err);
        obs.next(data);
      });
    });
}

export function io<T>(fn: Function) {
  return (...args: any[]) =>
    new Observable<T>(obs => {
      fn(...args, (err: Error, data: T) => {
        if (err) return obs.error(err);
        obs.next(data);
      });
    });
}
