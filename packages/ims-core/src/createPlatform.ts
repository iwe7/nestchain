import { StaticProvider } from './di/provider';
import { InjectionToken } from './di/injection_token';
import { Injector } from './di/injector';
import { Type } from './type';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { concatMap } from 'rxjs/operators';
import { ApplicationInitStatus } from './application_init';
import { ApplicationRef } from './application_ref';
import {
  NgModuleRef,
  compileNgModuleFactory,
  NgModuleFactory,
} from './di/ngModule';

export class PlatformRef {
  private _modules: NgModuleRef<any>[] = [];
  readonly destroyed: boolean;
  get injector(): Injector {
    return this._injector;
  }
  constructor(public _injector: Injector) {}
  bootstrapModule<M>(moduleType: Type<M>): Observable<NgModuleRef<M>> {
    return compileNgModuleFactory(this.injector, moduleType).pipe(
      concatMap(factory => {
        return this.bootstrapModuleFactory(factory);
      }),
    );
  }
  bootstrapModuleFactory<M>(
    moduleFactory: NgModuleFactory<M>,
  ): Observable<NgModuleRef<M>> {
    let moduleRef = moduleFactory.create(this.injector);
    moduleRef.onDestroy(() => remove(this._modules, moduleRef));
    const initStatus = moduleRef.injector.get(ApplicationInitStatus);
    initStatus.runInitializers();
    let { ngDoBootstrap } = moduleRef.instance as any;
    if (ngDoBootstrap) {
      const appRef = moduleRef.injector.get(ApplicationRef) as ApplicationRef;
      ngDoBootstrap(appRef);
    }
    this._modules.push(moduleRef);
    return from(initStatus.donePromise).pipe(map(() => moduleRef));
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

export function createPlatform(injector: Injector): PlatformRef {
  if (
    _platform &&
    !_platform.destroyed &&
    !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)
  ) {
    throw new Error(
      'There can be only one platform. Destroy the previous one to create a new one.',
    );
  }
  _platform = injector.get(PlatformRef);
  const inits = injector.get(PLATFORM_INITIALIZER, null);
  if (inits) inits.forEach((init: any) => init());
  return _platform;
}

export function getPlatform(): PlatformRef | null {
  return _platform && !_platform.destroyed ? _platform : null;
}
export interface PlatformFactory {
  (extraProviders?: StaticProvider[]): PlatformRef;
}
export function createPlatformFactory(
  parentPlatformFactory: PlatformFactory | null,
  name: string,
  providers: StaticProvider[] = [],
): (extraProviders?: StaticProvider[]) => PlatformRef {
  const desc = `Platform: ${name}`;
  const marker = new InjectionToken(desc);
  return (extraProviders: StaticProvider[] = []) => {
    let platform = getPlatform();
    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
      if (parentPlatformFactory) {
        parentPlatformFactory(
          providers
            .concat(extraProviders)
            .concat({ provide: marker, useValue: true }),
        );
      } else {
        const injectedProviders: StaticProvider[] = providers
          .concat(extraProviders)
          .concat({ provide: marker, useValue: true });
        createPlatform(
          Injector.create({ providers: injectedProviders, name: desc }),
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
