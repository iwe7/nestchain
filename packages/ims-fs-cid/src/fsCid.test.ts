import { ImsFsCidModule } from './module';
import { corePlatform } from 'ims-core';
import { ImsFsCid } from '.';
import { ROOT } from 'ims-const';

corePlatform()
  .then(res => res.bootstrapModule(ImsFsCidModule))
  .then(async res => {
    let cid = res.injector.get(ImsFsCid);
    let hash = await cid.getDirHash(ROOT + '/src');
    debugger;
  });
