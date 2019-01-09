import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  IpfsBlockFactory,
} from 'ims-core';
import { ImsIpsBlockProviders } from './index';
import createMultihashProvider from 'ims-multihash';
import createBasexProvider from 'ims-base-x';
import createVarintProvider from 'ims-varint';
import createCidProvider from 'ims-cid';

import createMulticodecProvider from 'ims-multicodec';
import createMultibaseProvider from 'ims-multibase';

let platform = createPlatformFactory(corePlatform, 'platform-multibase', [
  ...ImsIpsBlockProviders,
  ...createMultihashProvider(),
  ...createBasexProvider(),
  ...createVarintProvider(),
  ...createMulticodecProvider(),
  ...createMultibaseProvider(),
  ...createCidProvider()
]);

@NgModule()
export class MultihashModule {}

platform()
  .bootstrapModule(MultihashModule)
  .subscribe(res => {
    let basex = res.injector.get<IpfsBlockFactory>(IpfsBlockFactory);
    const multihashStr = 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB';
    let block = basex.create(Buffer.from(multihashStr));
    debugger;
  });
