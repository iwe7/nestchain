import { MultihashType } from 'ims-core';
const secp256k1 = require('secp256k1');
import { Multihashing } from 'ims-multihash';

export class ImsP2pCrypto {
  constructor(public multihashing: Multihashing, public randomBytes: any) {}
  generateKey() {
    let privateKey;
    do {
      privateKey = this.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKey));
    return privateKey;
  }

  hashAndSign(key, msg) {
    let digest = this.multihashing.digest(msg, MultihashType['sha2-256']);
    const sig = secp256k1.sign(digest, key);
    const sigDER = secp256k1.signatureExport(sig.signature);
    return sigDER;
  }
  hashAndVerify(key, sig, msg) {
    let digest = this.multihashing.digest(msg, MultihashType['sha2-256']);
    sig = secp256k1.signatureImport(sig);
    const valid = secp256k1.verify(digest, sig, key);
    return valid;
  }
  compressPublicKey(key) {
    if (!secp256k1.publicKeyVerify(key)) {
      throw new Error('Invalid public key');
    }
    return secp256k1.publicKeyConvert(key, true);
  }
  decompressPublicKey(key) {
    return secp256k1.publicKeyConvert(key, false);
  }
  validatePrivateKey(key) {
    if (!secp256k1.privateKeyVerify(key)) {
      throw new Error('Invalid private key');
    }
  }
  validatePublicKey(key) {
    if (!secp256k1.publicKeyVerify(key)) {
      throw new Error('Invalid public key');
    }
  }
  computePublicKey(privateKey) {
    this.validatePrivateKey(privateKey);
    return secp256k1.publicKeyCreate(privateKey);
  }
}
