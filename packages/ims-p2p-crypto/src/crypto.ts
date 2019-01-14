import { Injectable } from 'ims-core';
import randomBytes = require('iso-random-stream/src/random');
import forgePbkdf2 = require('node-forge/lib/pbkdf2');
import forgeUtil = require('node-forge/lib/util');
import { ImsP2pCryptoKeys } from './keys/keys';
import { ImsP2pCryptoHmac } from './hmac/hmac';
import { ImsP2pCryptoAes } from './aes/aes';
const hashName = {
  sha1: 'sha1',
  'sha2-256': 'sha256',
  'sha2-512': 'sha512',
};
@Injectable({
  providedIn: 'root',
})
export class ImsP2pCrypto {
  constructor(
    public keys: ImsP2pCryptoKeys,
    public hmac: ImsP2pCryptoHmac,
    public aes: ImsP2pCryptoAes,
  ) {}
  pbkdf2(
    password: string,
    salt: string,
    iterations: number,
    keySize: number,
    hash: 'sha1' | 'sha2-256' | 'sha2-512',
  ): string {
    const hasher = hashName[hash];
    if (!hasher) {
      throw new Error(`Hash '${hash}' is unknown or not supported`);
    }
    const dek = forgePbkdf2(password, salt, iterations, keySize, hasher);
    return forgeUtil.encode64(dek);
  }

  randomBytes(len: number) {
    if (!len || typeof len !== 'number') {
      throw new Error('first argument must be a Number bigger than 0');
    }
    return randomBytes(len);
  }
}
