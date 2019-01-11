import { createPlatformFactory, corePlatform } from 'ims-core';
import { P2pCryptoModule } from './index';
import { Crypto } from './crypto';
let platform = createPlatformFactory(corePlatform, 'platform-varint', []);

platform()
  .bootstrapModule(P2pCryptoModule)
  .subscribe(async res => {
    let crypto = res.injector.get(Crypto);
    let hash = 'SHA1';
    let hmac = await crypto.hmac.create(hash, Buffer.from('test'));
    let sign = hmac.digest(Buffer.from('hello world')).toString('hex');
    let len = sign.length;
    debugger;
  });
