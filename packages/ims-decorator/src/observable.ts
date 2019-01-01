import { Subject } from 'rxjs';

export const Observable = ins => {
  new Proxy(ins, {
    getPrototypeOf(tar: any): object | null {
      return Reflect.getPrototypeOf(tar);
    },
    setPrototypeOf(tar: any, v: any): boolean {
      return Reflect.setPrototypeOf(tar, v);
    },
    isExtensible(tar: any): boolean {
      return Reflect.isExtensible(tar);
    },
    preventExtensions(tar: any): boolean {
      return Reflect.preventExtensions(tar);
    },
    getOwnPropertyDescriptor(
      tar: any,
      p: PropertyKey,
    ): PropertyDescriptor | undefined {
      return Reflect.getOwnPropertyDescriptor(tar, p);
    },
    has(tar: any, p: PropertyKey): boolean {
      return Reflect.has(tar, p);
    },
    get(tar: any, p: PropertyKey, receiver: any): any {
      return Reflect.get(tar, p, receiver);
    },
    set(tar: any, p: PropertyKey, value: any, receiver: any): boolean {
      // 改变
      ins.onChange &&
        ins.onChange({
          tar,
          p,
          value,
          receiver,
        });
      return Reflect.set(tar, p, value, receiver);
    },
    deleteProperty(tar: any, p: PropertyKey): boolean {
      return Reflect.deleteProperty(tar, p);
    },
    defineProperty(
      tar: any,
      p: PropertyKey,
      attributes: PropertyDescriptor,
    ): boolean {
      return Reflect.defineProperty(tar, p, attributes);
    },
    enumerate(tar: any): PropertyKey[] {
      return Reflect.enumerate(tar) as any;
    },
    ownKeys(tar: any): PropertyKey[] {
      return Reflect.ownKeys(tar);
    },
    apply(tar: any, thisArg: any, argArray?: any): any {
      return Reflect.apply(tar, thisArg, argArray);
    },
    construct(tar: any, argArray: any, newTarget?: any): object {
      return Reflect.construct(tar, argArray, newTarget);
    },
  });
};
