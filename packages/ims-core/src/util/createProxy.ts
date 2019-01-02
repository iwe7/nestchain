import * as l from '../interface/lifecycle';
export function createProxy(Target: any): any {
  let isObject = typeof Target === 'object' || typeof Target === 'function';
  if (!isObject) {
    return Target;
  }
  if (typeof Target === 'undefined') {
    return Target;
  }
  if (Target === null) {
    return Target;
  }
  return new Proxy(Target, {
    /**
     * 获取prototype
     * @param tar
     */
    getPrototypeOf(tar: object): object | null {
      if (l.hasOnBeforeGetPrototypeOf(tar)) {
        tar.onBeforeGetPrototypeOf();
      }
      if (l.hasOnGetPrototypeOf(tar)) {
        return createProxy(tar.OnGetPrototypeOf());
      }
      return createProxy(Reflect.getPrototypeOf(tar));
    },
    /**
     * 设置prototype
     * @param tar
     * @param v
     */
    setPrototypeOf(tar: object, v: any): boolean {
      if (l.hasOnBeforeSetPrototypeOf(tar)) {
        v = tar.onBeforeSetPrototypeOf(v);
      }
      if (l.hasOnSetPrototypeOf(tar)) {
        return tar.OnSetPrototypeOf(v);
      }
      return Reflect.setPrototypeOf(tar, v);
    },
    /**
     * 方法判断一个对象是否是可扩展的(是否可以在它上面添加新的属性)
     * @param tar
     */
    isExtensible(tar: any): boolean {
      if (l.hasOnBeforeIsExtensible(tar)) {
        tar.onBeforeIsExtensible();
      }
      if (l.hasOnIsExtensible(tar)) {
        return tar.OnIsExtensible();
      }
      return Reflect.isExtensible(tar);
    },
    /**
     * 方法让一个对象变的不可扩展,也就是永远不能再添加新的属性。
     * @param tar
     */
    preventExtensions(tar: any): boolean {
      if (l.hasOnBeforePreventExtensions(tar)) {
        tar.onBeforePreventExtensions();
      }
      if (l.hasOnPreventExtensions(tar)) {
        return tar.OnPreventExtensions();
      }
      return Reflect.preventExtensions(tar);
    },
    /**
     * 返回指定对象上一个自有属性对应的属性描述符
     * @param tar
     * @param p
     */
    getOwnPropertyDescriptor(
      tar: any,
      p: PropertyKey,
    ): PropertyDescriptor | undefined {
      if (l.hasOnBeforeGetOwnPropertyDescriptor(tar)) {
        p = tar.onBeforeGetOwnPropertyDescriptor(p);
      }
      if (l.hasOnGetOwnPropertyDescriptor(tar)) {
        return tar.onGetOwnPropertyDescriptor(p);
      }
      return Reflect.getOwnPropertyDescriptor(tar, p);
    },
    has(tar: any, p: PropertyKey): boolean {
      if (l.hasOnBeforeHas(tar)) {
        p = tar.onBeforeHas(p);
      }
      if (l.hasOnHas(tar)) {
        return tar.onHas(p);
      }
      return Reflect.has(tar, p);
    },
    get(tar: any, p: PropertyKey, receiver: any): any {
      if (l.hasOnBeforeGet(tar)) {
        [p, receiver] = tar.onBeforeSet(p, receiver);
      }
      if (l.hasOnGet(tar)) {
        return createProxy(tar.onGet(p, receiver));
      }
      return createProxy(Reflect.get(tar, p, receiver));
    },
    set(tar: any, p: PropertyKey, value: any, receiver: any): boolean {
      if (l.hasOnBeforeSet(tar)) {
        [p, value, receiver] = tar.onBeforeSet(p, value, receiver);
      }
      if (l.hasOnSet(tar)) {
        return tar.OnSet(p, value, receiver);
      }
      return Reflect.set(tar, p, value, receiver);
    },
    deleteProperty(tar: any, p: PropertyKey): boolean {
      if (l.hasOnBeforeDeleteProperty(tar)) {
        p = tar.onBeforeDeleteProperty(p);
      }
      if (l.hasOnDeleteProperty(tar)) {
        return tar.OnDeleteProperty(p);
      }
      return Reflect.deleteProperty(tar, p);
    },
    defineProperty(
      tar: any,
      p: PropertyKey,
      attributes: PropertyDescriptor,
    ): boolean {
      if (l.hasOnBeforeDefineProperty(tar)) {
        [p, attributes] = tar.onBeforeDefineProperty(p, attributes);
      }
      if (l.hasOnDefineProperty(tar)) {
        return tar.OnDefineProperty(p, attributes);
      }
      return Reflect.defineProperty(tar, p, attributes);
    },
    enumerate(tar: any): PropertyKey[] {
      if (l.hasOnBeforeEnumerate(tar)) {
        tar.onBeforeEnumerate();
      }
      if (l.hasOnEnumerate(tar)) {
        return tar.OnEnumerate();
      }
      return Reflect.enumerate(tar) as any;
    },
    ownKeys(tar: any): PropertyKey[] {
      if (l.hasOnBeforeOwnKeys(tar)) {
        tar.onBeforeOwnKeys();
      }
      if (l.hasOnOwnKeys(tar)) {
        return tar.OnOwnKeys();
      }
      return Reflect.ownKeys(tar);
    },
    apply(tar: any, thisArg: any, argArray?: any): any {
      if (l.hasOnBeforeApply(tar)) {
        [thisArg, argArray] = tar.onBeforeApply(thisArg, argArray);
      }
      if (l.hasOnApply(tar)) {
        return createProxy(tar.OnApply(thisArg, argArray));
      }
      return createProxy(Reflect.apply(tar, thisArg, argArray));
    },
    construct(tar: any, argArray: any, newTarget?: any): object {
      if (l.hasOnBeforeConstruct(tar)) {
        [argArray, newTarget] = tar.onBeforeConstruct(argArray, newTarget);
      }
      if (l.hasOnConstruct(tar)) {
        return createProxy(tar.OnConstruct(argArray, newTarget));
      }
      return createProxy(new tar(...argArray));
    },
  });
}
