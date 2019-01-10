import { Injectable } from 'ims-core';
import { Ciphers } from './ciphers';
const CIPHER_MODES = {
  16: 'aes-128-ctr',
  32: 'aes-256-ctr',
};
@Injectable()
export class Aes {
  constructor(public ciphers: Ciphers) {}
  create(
    key: string | Buffer | NodeJS.TypedArray,
    iv: string | Buffer | NodeJS.TypedArray,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const mode = CIPHER_MODES[key.length];
      if (!mode) {
        reject(new Error(`Invalid key length`));
      }
      const cipher = this.ciphers.createCipheriv(mode, key, iv);
      const decipher = this.ciphers.createDecipheriv(mode, key, iv);
      const res = {
        encrypt(data: Buffer | NodeJS.TypedArray | DataView): Buffer {
          return cipher.update(data);
        },
        decrypt(data: Buffer | NodeJS.TypedArray | DataView): Buffer {
          return decipher.update(data);
        },
      };
      resolve(res);
    });
  }
}
