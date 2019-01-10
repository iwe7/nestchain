import { createPlatformFactory, corePlatform, Multicodec } from 'ims-core';
import { MulticodecModule } from './index';

let platform = createPlatformFactory(corePlatform, 'platform-varint', []);

platform()
  .bootstrapModule(MulticodecModule)
  .subscribe(res => {
    let buf = new Buffer('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', 'hex');
    let multicodec = res.injector.get<Multicodec>(Multicodec);
    let prefixedProtobuf = multicodec.addPrefix('protobuf', buf);
    let str = prefixedProtobuf.toString('hex');
    debugger;
  });
