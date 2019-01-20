export function createProxyWithDefault(
  item: object,
  config: ProxyHandler<any>,
) {
  return new Proxy(item, {
    getPrototypeOf(target: any): object | null {
      return Reflect.getPrototypeOf(target);
    },
    setPrototypeOf(target: any, v: any): boolean {
      return Reflect.setPrototypeOf(target, v);
    },
    isExtensible(target: any): boolean {
      return Reflect.isExtensible(target);
    },
    preventExtensions(target: any): boolean {
      return Reflect.preventExtensions(target);
    },
    getOwnPropertyDescriptor(
      target: any,
      p: PropertyKey,
    ): PropertyDescriptor | undefined {
      return Reflect.getOwnPropertyDescriptor(target, p);
    },
    has(target: any, p: PropertyKey): boolean {
      return Reflect.has(target, p);
    },
    get(target: any, p: PropertyKey, receiver: any): any {
      return Reflect.get(target, p, receiver);
    },
    set(target: any, p: PropertyKey, value: any, receiver: any): boolean {
      return Reflect.set(target, p, value, receiver);
    },
    deleteProperty(target: any, p: PropertyKey): boolean {
      return Reflect.deleteProperty(target, p);
    },
    defineProperty(
      target: any,
      p: PropertyKey,
      attributes: PropertyDescriptor,
    ): boolean {
      return Reflect.defineProperty(target, p, attributes);
    },
    enumerate(target: any): PropertyKey[] {
      return Reflect.enumerate(target) as any;
    },
    ownKeys(target: any): PropertyKey[] {
      return Reflect.ownKeys(target) as any;
    },
    apply(target: any, thisArg: any, argArray?: any): any {
      return Reflect.apply(target, thisArg, argArray) as any;
    },
    construct(target: any, argArray: any, newTarget?: any): object {
      return Reflect.construct(target, argArray, newTarget) as any;
    },
    ...config,
  });
}
