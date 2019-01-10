import { P2pSwitchModule } from './index';
import { createPlatformFactory, corePlatform } from 'ims-core';
import { P2pSwitch } from './switch';
let platform = createPlatformFactory(corePlatform, 'p2p-core', []);
platform()
  .bootstrapModule(P2pSwitchModule)
  .subscribe(res => {
    const injector = res.injector;
    let kad = injector.get(P2pSwitch);
    debugger;
  });
