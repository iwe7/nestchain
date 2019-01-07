export * from 'libp2p-crypto';
import { ImsCryptoHmac } from './hmac';
import { ImsCryptoAes } from './aes';
import { ImsCryptoKeys } from './keys';
import { ImsCryptoHash } from './hash';
export declare class ImsCrypto {
    hmac: ImsCryptoHmac;
    aes: ImsCryptoAes;
    keys: ImsCryptoKeys;
    hash: ImsCryptoHash;
    createHash(): void;
}
declare const _default: ImsCrypto;
export default _default;
