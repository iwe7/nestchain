import { isFunction } from 'ims-util';

export function awaitify(asyncFn: any) {
  return new Proxy(asyncFn, {
    apply(target: any, thisArg: any, argArray?: any): any {
      if (isFunction(argArray[argArray.length - 1])) {
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
