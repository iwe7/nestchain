export class ImsContext {
  cache: Map<string, any> = new Map();
  get parents() {
    let parents = [];
    this._parents.forEach(parent => parents.push(parent));
    return parents;
  }
  constructor(public _parents: Set<ImsContext> = new Set()) {}
  regist(namespace: string, value: any) {
    this.cache.set(namespace, value);
  }
  has(namespace: string) {
    return this.cache.has(namespace);
  }
  get<T>(namespace: string, def?: T): T {
    if (this.has(namespace)) return this.cache.get(namespace);
    for (let item of this.parents) {
      if (item.has(namespace)) {
        return item.get(namespace);
      }
    }
    return def;
  }
  addParent(parent: ImsContext): void {
    this._parents.add(parent);
  }
  addParents(parents: ImsContext[]): void {
    parents.map(parent => this.addParent(parent));
  }
  createParent() {
    let context = new ImsContext();
    this.addParent(context);
    return context;
  }
  createChild() {
    let context = new ImsContext();
    context.addParent(this);
    return context;
  }
}
/**
 * 全局作用域
 */
export const GlobalContext = new ImsContext();
GlobalContext.regist('console', console);
