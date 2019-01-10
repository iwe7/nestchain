import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  CidFactory,
} from 'ims-core';
import { CidModule } from './index';
import createMultihashProvider from 'ims-multihash';
import { BaseXModule } from 'ims-base-x';
import { VarintModule } from 'ims-varint';
import createMulticodecProvider from 'ims-multicodec';
import createMultibaseProvider from 'ims-multibase';

let platform = createPlatformFactory(
  corePlatform,
  'platform-multibase',
  [
    ...createMultihashProvider(),
    ...createMulticodecProvider(),
    ...createMultibaseProvider(),
  ],
  [BaseXModule, VarintModule, CidModule],
);

platform()
  .bootstrapModule(CidModule)
  .subscribe(res => {
    let basex = res.injector.get<CidFactory>(CidFactory);
    const multihashStr = 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB';
    const cidv0 = basex.create(multihashStr);
    console.log(cidv0.toBaseEncodedString());
    const cidv1 = cidv0.toV1();
    console.log(cidv1.toBaseEncodedString());
    debugger;
  });
