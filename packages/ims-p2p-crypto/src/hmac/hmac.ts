import { Injectable } from 'ims-core';
const lengths = {
  SHA1: 20,
  SHA256: 32,
  SHA512: 64,
};
import crypto = require('crypto');
@Injectable({
  providedIn: 'root',
})
export class ImsP2pCryptoHmac {
  create(
    hash: string,
    secret: string | Buffer | NodeJS.TypedArray | DataView,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let res = {
        digest(data: string | Buffer | NodeJS.TypedArray | DataView): Buffer {
          const hmac = crypto.createHmac(hash.toLowerCase(), secret);
          hmac.update(data);
          return hmac.digest();
        },
        length: lengths[hash.toUpperCase()],
      };
      resolve(res);
    });
  }
}
