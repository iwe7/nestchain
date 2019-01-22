import { Type } from 'ims-util';
import { Injector } from './injector';
import { StaticProvider } from './provider';
import { InjectionToken } from './injection_token';
import { concat, from } from 'ims-rxjs';
export interface AppInitialization {
  /**
   * index越大越重要，越靠前
   */
  index: number;
  (injector: Injector): Promise<void>;
}
export const AppInitialization = new InjectionToken<AppInitialization[]>(
  'App_Initialization',
);

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

export async function createImsProviders(
  type: any,
  injector?: Injector,
): Promise<StaticProvider[]> {
  injector = injector || Injector.top;
  return await type[symbolGetProviders](injector);
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
    let injector = Injector.create(staticProviders);
    let ref = new ImsRef(injector, instance);
    await injector.set([
      {
        provide: ImsRef,
        useValue: ref,
      },
    ]);
    let appInits = await injector.get(AppInitialization);
    if (Array.isArray(appInits) && appInits.length > 0) {
      await concat(
        ...appInits
          .sort((a, b) => {
            if (a.index && b.index) {
              return a.index - b.index;
            }
            return 0;
          })
          .map(app => from(app(injector))),
      ).toPromise();
    }
    return ref;
  }
}
