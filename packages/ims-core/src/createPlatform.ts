import { StaticProvider, StaticProviders } from './di/provider';
import { InjectionToken } from './di/injection_token';
import { Injector } from './di/injector';
import { Type } from './type';
import { ApplicationInitStatus } from './application_init';
import { ApplicationRef } from './application_ref';
import { PlatformName } from './tokens';
import {
  createImsFactory,
  ImsRef,
  ImsFactory,
  symbolGetProviders,
} from './di/ims';

export class PlatformRef {
  private _modules: ImsRef<any>[] = [];
  readonly destroyed: boolean;
  get injector(): Injector {
    return this._injector;
  }
  constructor(public _injector: Injector) {}
  async bootstrapModule<M>(moduleType: Type<M>): Promise<ImsRef<M>> {
    return await this.bootstrapModuleFactory<M>(createImsFactory(moduleType));
  }
  async bootstrapModuleFactory<M>(
    moduleFactory: ImsFactory<M>,
  ): Promise<ImsRef<M>> {
    let moduleRef: ImsRef<M> = await moduleFactory.create(this._injector);
    moduleRef.onDestroy(() => remove(this._modules, moduleRef));
    const initStatus = await moduleRef.injector.get<ApplicationInitStatus>(
      ApplicationInitStatus,
    );
    initStatus.runInitializers(moduleRef.injector);
    let { ngDoBootstrap } = moduleRef.instance as any;
    if (ngDoBootstrap) {
      const appRef = moduleRef.injector.get(ApplicationRef) as ApplicationRef;
      ngDoBootstrap(appRef);
    }
    this._modules.push(moduleRef);
    await initStatus.donePromise;
    return moduleRef;
  }
}

function remove<T>(list: T[], el: T): void {
  const index = list.indexOf(el);
  if (index > -1) {
    list.splice(index, 1);
  }
}

let _platform: PlatformRef;
export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>(
  'AllowMultipleToken',
);
export const PLATFORM_INITIALIZER = new InjectionToken<Array<() => void>>(
  'Platform Initializer',
);
export const PLATFORM_ID = new InjectionToken<Object>('Platform Id');

export async function createPlatform(
  providers: StaticProviders,
): Promise<PlatformRef> {
  if (
    _platform &&
    !_platform.destroyed &&
    !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)
  ) {
    throw new Error(
      'There can be only one platform. Destroy the previous one to create a new one.',
    );
  }
  if (typeof providers === 'function') {
    providers = await providers();
  }
  let injector = await Injector.create(providers);
  _platform = await injector.get<PlatformRef>(PlatformRef);
  const inits = await injector.get(PLATFORM_INITIALIZER, null);
  if (inits) inits.forEach((init: any) => init(injector));
  // platform init后执行
  return _platform;
}

export function getPlatform(): PlatformRef | null {
  return _platform && !_platform.destroyed ? _platform : null;
}

export interface PlatformFactory {
  (extraProviders?: StaticProviders): Promise<PlatformRef>;
}
export function createPlatformFactory(
  parentPlatformFactory: PlatformFactory | null,
  name: string,
  providers: StaticProviders = [],
  types?: Type<any>[],
): (extraProviders?: StaticProviders) => Promise<PlatformRef> {
  return async (extraProviders: StaticProviders = []) => {
    const desc = `Platform: ${name}`;
    const marker = new InjectionToken(desc);
    let injectedProviders: StaticProvider[] = [];
    if (typeof providers === 'function') {
      injectedProviders = await providers();
    } else {
      injectedProviders = providers;
    }
    injectedProviders.push({
      provide: PlatformName,
      useValue: name,
    });
    if (typeof extraProviders === 'function') {
      extraProviders = await extraProviders();
      injectedProviders.concat(...extraProviders);
    } else {
      injectedProviders.concat(...extraProviders);
    }
    let platform = getPlatform();
    const getAllProviders = async () => {
      if (types) {
        let obs = [];
        types.forEach(type => {
          if (Reflect.has(type, symbolGetProviders)) {
            obs.push(
              type[symbolGetProviders]().then(pros => {
                injectedProviders.concat(pros);
              }),
            );
          }
        });
        await Promise.all(obs);
      }
      injectedProviders.concat({
        provide: marker,
        useValue: true,
      });
      return injectedProviders;
    };

    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
      if (parentPlatformFactory) {
        await parentPlatformFactory(getAllProviders);
      } else {
        await createPlatform(getAllProviders);
      }
    }
    return assertPlatform(marker);
  };
}

export function assertPlatform(requiredToken: any): PlatformRef {
  const platform = getPlatform();
  if (!platform) {
    throw new Error('No platform exists!');
  }
  if (!platform.injector.get(requiredToken, null)) {
    throw new Error(
      'A platform with a different configuration has been created. Please destroy it first.',
    );
  }
  return platform;
}
