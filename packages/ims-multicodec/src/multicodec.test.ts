import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  Multicodec,
  MultihashType,
} from 'ims-core';
import createProvider from './index';
import createVarintProvider from 'ims-varint';

let platform = createPlatformFactory(corePlatform, 'platform-varint', [
  ...createProvider(),
  ...createVarintProvider(),
]);
@NgModule()
export class MultihashModule {}

platform()
  .bootstrapModule(MultihashModule)
  .subscribe(res => {
    let buf = new Buffer('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', 'hex');
    let multicodec = res.injector.get<Multicodec>(Multicodec);
    let prefixedProtobuf = multicodec.addPrefix('protobuf', buf);
    let str = prefixedProtobuf.toString('hex');
    debugger;
  });
