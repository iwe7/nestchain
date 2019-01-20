import { createPlatformFactory, PlatformRef } from '../createPlatform';
import { Injector } from '../di/injector';
import { ApplicationRef } from '../application_ref';
import { ApplicationInitStatus, APP_INITIALIZER } from '../application_init';
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
import { NgModule } from '../di/ngModule';

@NgModule()
export class CoreModule {}
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
    useFactory: async (injector: Injector) => {
      let appInits = await injector.get(APP_INITIALIZER, []);
      return new ApplicationInitStatus(appInits);
    },
    deps: [Injector],
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
