import {
  createPlatformFactory,
  corePlatform,
  CidFactory,
} from 'ims-core';
import { CidModule } from './index';
import { BaseXModule } from 'ims-base-x';
import { VarintModule } from 'ims-varint';

let platform = createPlatformFactory(
  corePlatform,
  'platform-multibase',
  [],
  [BaseXModule, VarintModule, CidModule],
);

platform()
  .then(res => res.bootstrapModule(CidModule))
  .then(res => {
    let basex = res.injector.get<CidFactory>(CidFactory);
    const multihashStr = 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB';
    const cidv0 = basex.create(multihashStr);
    console.log(cidv0.toBaseEncodedString());
    const cidv1 = cidv0.toV1();
    console.log(cidv1.toBaseEncodedString());
    debugger;
  });
