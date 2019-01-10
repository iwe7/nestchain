import { ImsP2pKadDhtModule } from './index';
import { createPlatformFactory, corePlatform } from 'ims-core';
import { KadDht } from './kad_dht';
let platform = createPlatformFactory(corePlatform, 'p2p-core', []);
platform()
  .bootstrapModule(ImsP2pKadDhtModule)
  .subscribe(res => {
    const injector = res.injector;
    let kad = injector.get(KadDht);
    debugger;
  });
