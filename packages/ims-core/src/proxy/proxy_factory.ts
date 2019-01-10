export const emptyFunction = (dir: any) => dir;
export class ProxyFactory implements ProxyHandler<any> {
  static defaultProxyController = new ProxyFactory(ProxyFactory.create);
  constructor(public controller: Function = emptyFunction) {}
  static create<T extends object = any>(
    Target: T,
    controller: ProxyFactory = ProxyFactory.defaultProxyController,
  ) {
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
    return new Proxy<T>(Target, controller);
  }
  /**
   * 获取prototype
   * @param tar
   */
  getPrototypeOf(tar: object): object | null {
    return Reflect.getPrototypeOf(tar);
  }
  /**
   * 设置prototype
   * @param tar
   * @param v
   */
  setPrototypeOf(tar: object, v: any): boolean {
    return Reflect.setPrototypeOf(tar, v);
  }
  /**
   * 方法判断一个对象是否是可扩展的(是否可以在它上面添加新的属性)
   * @param tar
   */
  isExtensible(tar: any): boolean {
    return Reflect.isExtensible(tar);
  }
  /**
   * 方法让一个对象变的不可扩展,也就是永远不能再添加新的属性。
   * @param tar
   */
  preventExtensions(tar: any): boolean {
    return Reflect.preventExtensions(tar);
  }
  /**
   * 返回指定对象上一个自有属性对应的属性描述符
   * @param tar
   * @param p
   */
  getOwnPropertyDescriptor(
    tar: any,
    p: PropertyKey,
  ): PropertyDescriptor | undefined {
    return Reflect.getOwnPropertyDescriptor(tar, p);
  }
  has(tar: any, p: PropertyKey): boolean {
    return Reflect.has(tar, p);
  }
  get(tar: any, p: PropertyKey, receiver: any): any {
    return this.controller(Reflect.get(tar, p, receiver));
  }
  set(tar: any, p: PropertyKey, value: any, receiver: any): boolean {
    return Reflect.set(tar, p, value, receiver);
  }
  deleteProperty(tar: any, p: PropertyKey): boolean {
    return Reflect.deleteProperty(tar, p);
  }
  defineProperty(
    tar: any,
    p: PropertyKey,
    attributes: PropertyDescriptor,
  ): boolean {
    return Reflect.defineProperty(tar, p, attributes);
  }
  enumerate(tar: any): PropertyKey[] {
    return Reflect.enumerate(tar) as any;
  }
  ownKeys(tar: any): PropertyKey[] {
    return Reflect.ownKeys(tar);
  }
  apply(tar: any, thisArg: any, argArray?: any): any {
    return this.controller(Reflect.apply(tar, thisArg, argArray));
  }
  construct(tar: any, argArray: any, newTarget?: any): object {
    return this.controller(new tar(...argArray));
  }
}
