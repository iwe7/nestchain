import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  CidFactory,
} from 'ims-core';
import createProvider from './index';
import createMultihashProvider from 'ims-multihash';
import createBasexProvider from 'ims-base-x';
import createVarintProvider from 'ims-varint';
import createMulticodecProvider from 'ims-multicodec';
import createMultibaseProvider from 'ims-multibase';

let platform = createPlatformFactory(corePlatform, 'platform-multibase', [
  ...createProvider(),
  ...createMultihashProvider(),
  ...createBasexProvider(
    '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
  ),
  ...createVarintProvider(),
  ...createMulticodecProvider(),
  ...createMultibaseProvider(),
]);

@NgModule()
export class MultihashModule {}

platform()
  .bootstrapModule(MultihashModule)
  .subscribe(res => {
    let basex = res.injector.get<CidFactory>(CidFactory);
    const multihashStr = 'QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB';
    const cidv0 = basex.create(multihashStr);
    console.log(cidv0.toBaseEncodedString());
    const cidv1 = cidv0.toV1();
    console.log(cidv1.toBaseEncodedString());
    debugger;
  });
