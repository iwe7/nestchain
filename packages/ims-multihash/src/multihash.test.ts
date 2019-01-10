import {
  createPlatformFactory,
  corePlatform,
  Multihash,
  MultihashType,
} from 'ims-core';
import { MultihashModule } from './index';

let platform = createPlatformFactory(corePlatform, 'platform-varint', []);

platform()
  .bootstrapModule(MultihashModule)
  .subscribe(res => {
    let buf = new Buffer('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', 'hex');
    let basex = res.injector.get<Multihash>(Multihash);
    let result = basex.encode(buf, MultihashType.sha1);
    let deresult = basex.decode(result);
    debugger;
  });
