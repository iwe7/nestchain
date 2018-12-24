import {
  createCipheriv,
  createDecipheriv,
  CipherGCM,
  DecipherGCM,
} from './ciphers';

const CIPHER_MODES = {
  16: 'aes-128-ctr',
  32: 'aes-256-ctr',
};

export interface ICallback<T> {
  (err: Error, data: T): any;
}

export function create(
  key: string | Buffer | NodeJS.TypedArray,
  iv: string | Buffer | NodeJS.TypedArray,
  callback: (
    err: Error,
    data?: {
      encrypt: (
        data: Buffer | NodeJS.TypedArray | DataView,
        cb: ICallback<Buffer>,
      ) => any;
      decrypt: (
        data: Buffer | NodeJS.TypedArray | DataView,
        cb: ICallback<Buffer>,
      ) => any;
    },
  ) => any,
) {
  const mode = CIPHER_MODES[key.length];
  if (!mode) {
    return callback(new Error('Invalid key length'));
  }
  const cipher: CipherGCM = createCipheriv(mode, key, iv);
  const decipher: DecipherGCM = createDecipheriv(mode, key, iv);
  callback(null, {
    encrypt(
      data: Buffer | NodeJS.TypedArray | DataView,
      cb: ICallback<Buffer>,
    ) {
      cb(null, cipher.update(data));
    },
    decrypt(
      data: Buffer | NodeJS.TypedArray | DataView,
      cb: ICallback<Buffer>,
    ) {
      cb(null, decipher.update(data));
    },
  });
}
