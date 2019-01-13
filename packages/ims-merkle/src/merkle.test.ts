import { corePlatform } from 'ims-core';
import { ImsMerkleModule } from './index';
import { ImsMerkleTreeFactory } from './ims-merkle';
corePlatform().then(res => {
  res.bootstrapModule(ImsMerkleModule).then(res => {
    debugger;
    let fac = res.injector.get(ImsMerkleTreeFactory);
    let tree = fac.create({
      11: Buffer.from('11'),
      22: Buffer.from('22'),
      33: Buffer.from('33'),
    });
    let root = tree.hash;
    let json = tree.getJson();
    debugger;
  });
});
