import { StaticProvider } from './di/provider';
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
    let moduleRef: ImsRef<M> = await moduleFactory.create();
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

export async function createPlatform(injector: Injector): Promise<PlatformRef> {
  if (
    _platform &&
    !_platform.destroyed &&
    !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)
  ) {
    throw new Error(
      'There can be only one platform. Destroy the previous one to create a new one.',
    );
  }
  _platform = await injector.get<PlatformRef>(PlatformRef);
  const inits = await injector.get(PLATFORM_INITIALIZER, null);
  if (inits) inits.forEach((init: any) => init(injector));
  return _platform;
}

export function getPlatform(): PlatformRef | null {
  return _platform && !_platform.destroyed ? _platform : null;
}
export interface PlatformFactory {
  (extraProviders?: StaticProvider[]): Promise<PlatformRef>;
}
export function createPlatformFactory(
  parentPlatformFactory: PlatformFactory | null,
  name: string,
  providers: StaticProvider[] = [],
  types?: Type<any>[],
): (extraProviders?: StaticProvider[]) => Promise<PlatformRef> {
  const desc = `Platform: ${name}`;
  const marker = new InjectionToken(desc);
  providers.push({
    provide: PlatformName,
    useValue: name,
  });
  return async (extraProviders: StaticProvider[] = []) => {
    let platform = getPlatform();
    if (types) {
      types.forEach(async type => {
        if (Reflect.has(type, symbolGetProviders)) {
          let pros = await type[symbolGetProviders]();
          providers.concat(pros);
        }
      });
    }
    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
      if (parentPlatformFactory) {
        await parentPlatformFactory(
          providers
            .concat(extraProviders)
            .concat({ provide: marker, useValue: true }),
        );
      } else {
        const injectedProviders: StaticProvider[] = providers
          .concat(extraProviders)
          .concat({ provide: marker, useValue: true });
        await createPlatform(
          await Injector.create({ providers: injectedProviders, name: desc }),
        );
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
