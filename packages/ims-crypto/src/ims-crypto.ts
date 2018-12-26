export * from 'libp2p-crypto';
import { ImsCryptoHmac } from './hmac';
import { ImsCryptoAes } from './aes';
import { ImsCryptoKeys } from './keys';
import { ImsCryptoHash } from './hash';

export class ImsCrypto {
  hmac: ImsCryptoHmac = new ImsCryptoHmac();
  aes: ImsCryptoAes = new ImsCryptoAes();
  keys: ImsCryptoKeys = new ImsCryptoKeys();
  hash: ImsCryptoHash = new ImsCryptoHash();
  createHash() {}
}

export default new ImsCrypto();
