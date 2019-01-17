import { corePlatform, NgModule } from 'ims-core';
import { ImsDirTreeFactory } from '.';
import { ROOT } from 'ims-const';

@NgModule()
export class ImsDirTreeModule {}
corePlatform().then(res => {
  res.bootstrapModule(ImsDirTreeModule).then(async res => {
    let fat = res.injector.get(ImsDirTreeFactory);
    let tree = await fat.create(ROOT + '/src');
    debugger;
  });
});
