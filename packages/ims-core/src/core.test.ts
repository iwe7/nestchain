import { createPlatformFactory } from './createPlatform';
import { NgModule } from './di/ngModule';
import { ApplicationRef } from './application_ref';
import { Injectable } from './di/injectable';
import { corePlatform } from './platform/core';
let platformFactory = createPlatformFactory(corePlatform, 'core', []);
@Injectable({
  providedIn: 'root',
})
export class TestInjectable {}
@NgModule({
  providers: [],
  imports: [],
})
export class Test {
  ngDoBootstrap(appRef: ApplicationRef) {
    console.log(appRef);
  }
}
platformFactory([]).then(res => {
  res.bootstrapModule(Test).then(async res => {
    let inject = await res.injector.get(TestInjectable);
    debugger;
  });
});
