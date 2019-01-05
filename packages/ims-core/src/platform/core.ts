import { createPlatformFactory, PlatformRef } from '../createPlatform';
import { Injector } from '../di/injector';
import { ApplicationRef } from '../application_ref';
import { ApplicationInitStatus, APP_INITIALIZER } from '../application_init';
import { Inject, Optional } from '../di/metadata';

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
]);
