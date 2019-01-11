import { Injectable } from 'ims-core';
import libp2pCrypto = require('libp2p-crypto');

@Injectable()
export class Keys {
  constructor() {}
  generateKeyPair(type, bits): Promise<any> {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.generateKeyPair(type, bits, (err, key) => {
        if (err) reject(err);
        else resolve(key);
      });
    });
  }
  generateEphemeralKeyPair(type: 'P-256' | 'P-384' | 'P-521'): Promise<any> {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.generateEphemeralKeyPair(type, (err, key) => {
        if (err) reject(err);
        else resolve(key);
      });
    });
  }
  async keyStretcher(
    cipherType: 'AES-128' | 'AES-256' | 'Blowfish',
    hash: 'SHA1' | 'SHA256' | 'SHA512',
    secret: Buffer,
  ) {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.keyStretcher(cipherType, hash, secret, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  marshalPublicKey(key, type) {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.marshalPublicKey(key, type, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  unmarshalPublicKey(buf) {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.unmarshalPublicKey(buf, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  marshalPrivateKey(key, type): any {
    return libp2pCrypto.keys.marshalPrivateKey(key, type);
  }
  unmarshalPrivateKey(buf): any {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.unmarshalPrivateKey(buf, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  import(pem, password) {
    return new Promise((resolve, reject) => {
      libp2pCrypto.keys.import(pem, password, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}
