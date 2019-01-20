import { Type } from 'ims-util';
import { Injector } from './injector';
import { StaticProvider } from './provider';
export class ImsRef<T> {
  constructor(
    public readonly injector: Injector,
    public readonly instance: T,
  ) {}
  onDestroy(callback: Function) {}
}
export const symbolGetProviders = Symbol.for('symbolGetProviders');
export const symbolGetFactory = Symbol.for('symbolGetFactory');

export function createImsFactory<T>(type: any): ImsFactory<T> {
  return type[symbolGetFactory]();
}

export class ImsFactory<T> {
  [symbolGetProviders]: (injector: Injector) => Promise<StaticProvider[]>;
  constructor(
    public readonly type: Type<T>,
    getProviders: (injector: Injector) => Promise<StaticProvider[]>,
  ) {
    this[symbolGetProviders] = getProviders;
  }
  async create(parentInjector?: Injector): Promise<ImsRef<T>> {
    let instance = new this.type();
    let staticProviders = await this[symbolGetProviders](parentInjector);
    parentInjector.set(staticProviders);
    let ref = new ImsRef(parentInjector, instance);
    parentInjector.set([
      {
        provide: ImsRef,
        useValue: ref,
      },
    ]);
    return ref;
  }
}
