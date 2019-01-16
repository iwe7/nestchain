import { createPlatformFactory, corePlatform, MultihashType } from 'ims-core';
import { MultihashModule } from './index';
import { Multihashing } from './multihashing';

let platform = createPlatformFactory(corePlatform, 'platform-varint', []);

platform().then(res => {
  res.bootstrapModule(MultihashModule).then(res => {
    let buf = Buffer.from(
      '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a330beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a330beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a330beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33',
    );
    let basex = res.injector.get<Multihashing>(Multihashing);
    // let result = basex.encode(buf, MultihashType.sha1);
    // let deresult = basex.decode(result);
    let result = basex.hash(buf, MultihashType['sha2-256']).toString('hex')
      .length;
    debugger;
  });
});
