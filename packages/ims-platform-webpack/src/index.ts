import {
  createPlatformFactory,
  corePlatform,
  PLATFORM_INITIALIZER,
  Injector,
  NgModule,
} from 'ims-core';
let webpackPlatform = createPlatformFactory(corePlatform, 'platform webpack', [
  {
    provide: PLATFORM_INITIALIZER,
    useValue: (injector: Injector) => {
      console.log('platform init');
    },
    multi: true,
  },
]);

class ImsWebapckModule {}
export async function bootstrap(cfg: NgModule) {
  NgModule(cfg)(ImsWebapckModule);
  try {
    let platform = await webpackPlatform();
    let ref = await platform.bootstrapModule(ImsWebapckModule);
    return ref;
  } catch (e) {
    throw e;
  }
}
