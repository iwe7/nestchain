import { P2pSwitchModule } from './index';
import { createPlatformFactory, corePlatform } from 'ims-core';
import { P2pSwitch } from './switch';
let platform = createPlatformFactory(corePlatform, 'p2p-core', []);
platform()
  .then(res => res.bootstrapModule(P2pSwitchModule))
  .then(res => {
    const injector = res.injector;
    let kad = injector.get(P2pSwitch);
    debugger;
  });
