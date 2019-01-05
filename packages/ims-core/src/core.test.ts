import { createPlatformFactory, PlatformRef } from './createPlatform';
import { Injector } from './di/injector';
import { ApplicationInitStatus, APP_INITIALIZER } from './application_init';
import { Inject, Optional } from './di/metadata';
import { NgModule } from './di/ngModule';
import { ApplicationRef } from './application_ref';
import { corePlatform } from './platform/core';
import { expressPlatform } from './platform/express';
let platformFactory = createPlatformFactory(expressPlatform, 'core', []);

@NgModule({
  providers: [],
  imports: [],
  exports: [],
})
export class Test {
  ngDoBootstrap(appRef: ApplicationRef) {
    console.log(appRef);
  }
}

platformFactory([])
  .bootstrapModule(Test)
  .subscribe(res => {
    console.log(res);
  });
