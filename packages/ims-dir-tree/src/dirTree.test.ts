import { corePlatform, NgModule } from 'ims-core';
import { ImsDirTreeFactory, ImsDirTreeModule } from '.';
import { ROOT } from 'ims-const';

corePlatform().then(res => {
  res.bootstrapModule(ImsDirTreeModule).then(async res => {
    let fat = res.injector.get(ImsDirTreeFactory);
    let tree = await fat.create(ROOT + '/src');
    const hashTree = tree.toJson();
    let nodes = tree.getNodes();
    debugger;
  });
});
