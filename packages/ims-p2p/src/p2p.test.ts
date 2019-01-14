import { createPlatformFactory, corePlatform } from 'ims-core';
import { P2pModule } from './index';
import { ImsP2p } from './ims_p2p';

let platform = createPlatformFactory(corePlatform, 'platform-varint', []);
platform()
  .then(res => res.bootstrapModule(P2pModule))
  .then(async res => {
    try {
      let p2p = res.injector.get<ImsP2p>(ImsP2p);
      p2p.state.emit('start');
    } catch (e) {
      console.error(e);
    }
  });
