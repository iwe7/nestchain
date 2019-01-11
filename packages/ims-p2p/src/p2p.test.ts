import { createPlatformFactory, corePlatform } from 'ims-core';
import { P2pModule } from './index';
import { P2p } from './p2p';
let platform = createPlatformFactory(corePlatform, 'platform-varint', []);

platform()
  .bootstrapModule(P2pModule)
  .subscribe(async res => {
    try {
      let p2p = res.injector.get(P2p);
      let lis = await p2p.listener();
      let conn = await p2p.start();
    } catch (e) {
      console.error(e);
    }
  });
