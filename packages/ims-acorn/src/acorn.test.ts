import { corePlatform, NgModule } from 'ims-core';
import { ImsAcorn } from './index';
@NgModule()
export class TestAcornModule {}
corePlatform()
  .then(res => res.bootstrapModule(TestAcornModule))
  .then(res => {
    console.log('test acorn');
    let acorn = res.injector.get(ImsAcorn);
    let ast = acorn.parse(
      `
    let item = 1;
    `,
    );
    debugger;
  });
