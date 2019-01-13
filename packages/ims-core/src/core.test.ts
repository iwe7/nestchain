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
  res.bootstrapModule(Test).then(res => {
    let inject = res.injector.get(TestInjectable);
    console.log(res);
    debugger;
  });
});
