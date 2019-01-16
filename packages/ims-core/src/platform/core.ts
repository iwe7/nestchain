import { createPlatformFactory, PlatformRef } from '../createPlatform';
import { Injector } from '../di/injector';
import { ApplicationRef } from '../application_ref';
import { ApplicationInitStatus, APP_INITIALIZER } from '../application_init';
import { Inject, Optional } from '../di/metadata';
import {
  AppName,
  AppRoot,
  SourceRoot,
  PlatformName,
  DevOpen,
  AppConfig,
  DevPort,
  DevWatch,
} from '../tokens';
export const corePlatform = createPlatformFactory(null, 'core', [
  {
    provide: PlatformRef,
    useClass: PlatformRef,
    deps: [Injector],
  },
  {
    provide: ApplicationRef,
    useClass: ApplicationRef,
    deps: [],
  },
  {
    provide: ApplicationInitStatus,
    useClass: ApplicationInitStatus,
    deps: [[new Inject(APP_INITIALIZER), new Optional()]],
  },
  {
    provide: AppName,
    useValue: 'ims core',
  },
  {
    provide: AppRoot,
    useValue: './',
  },
  {
    provide: SourceRoot,
    useValue: './',
  },
  {
    provide: PlatformName,
    useValue: 'web',
  },
  {
    provide: DevOpen,
    useValue: true,
  },
  {
    provide: DevWatch,
    useValue: true,
  },
  {
    provide: AppConfig,
    useValue: {},
  },
  {
    provide: DevPort,
    useValue: 4200,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: () => {
      return () => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      };
    },
    multi: true,
    deps: [],
  },
]);
