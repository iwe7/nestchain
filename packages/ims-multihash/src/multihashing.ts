import { Injectable, Multihash, MultihashType } from 'ims-core';
import * as crypto from './crypto';
const table = {
  [`${MultihashType.sha1}`]: crypto.sha1,
  [`${MultihashType['sha2-256']}`]: crypto.sha2256,
  [`${MultihashType['sha2-512']}`]: crypto.sha2512,
  [`${MultihashType['sha3-512']}`]: crypto.sha3512,
  [`${MultihashType['sha3-384']}`]: crypto.sha3384,
  [`${MultihashType['sha3-256']}`]: crypto.sha3256,
  [`${MultihashType['sha3-224']}`]: crypto.sha3224,
  [`${MultihashType['shake-128']}`]: crypto.shake128,
  [`${MultihashType['shake-256']}`]: crypto.shake256,
  [`${MultihashType['keccak-224']}`]: crypto.keccak224,
  [`${MultihashType['keccak-256']}`]: crypto.keccak256,
  [`${MultihashType['keccak-384']}`]: crypto.keccak384,
  [`${MultihashType['keccak-512']}`]: crypto.keccak512,
  [`${MultihashType['murmur3-32']}`]: crypto.murmur332,
  [`${MultihashType['murmur3-128']}`]: crypto.murmur3128,
  [`${MultihashType['dbl-sha2-256']}`]: crypto.dblSha2256,
};
@Injectable({
  providedIn: 'root',
})
export class Multihashing {
  get functions() {
    return (() => {
      return crypto.addBlake(table);
    })();
  }
  constructor(public multihash: Multihash) {}

  hash(
    digest: Buffer,
    code: MultihashType = MultihashType['sha2-256'],
    length?: number,
  ) {
    let buf = this.digest(digest, code, length);
    return this.multihash.encode(buf, code, length);
  }

  digest(digest: Buffer, code: MultihashType, length?: number) {
    let res = digest.slice(0, length);
    return this.createHash(code)(res);
  }

  createHash(code: MultihashType) {
    let func = this.functions[code];
    if (!func) {
      throw new Error(
        'multihash function ' + MultihashType[code] + ' not yet supported',
      );
    }
    return func;
  }
}
