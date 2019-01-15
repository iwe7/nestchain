import { ImsP2pCrypto } from './crypto';
import { Multihashing } from 'ims-multihash';
import { Secp256k1PublicKeyFactory } from './secp256k1PublicKey';
export class Secp256k1PrivateKey {
  _key: any;
  _publicKey: any;
  constructor(
    key,
    publicKey,
    public crypto: ImsP2pCrypto,
    public multihashing: Multihashing,
    public secp256k1PublicKey: Secp256k1PublicKeyFactory,
    public keysProtobuf: any,
  ) {
    this._key = key;
    this._publicKey = publicKey || this.crypto.computePublicKey(key);
    this.crypto.validatePrivateKey(this._key);
    this.crypto.validatePublicKey(this._publicKey);
  }

  sign(message) {
    return this.crypto.hashAndSign(this._key, message);
  }

  get public() {
    return this.secp256k1PublicKey.create(this._publicKey);
  }

  marshal() {
    return this._key;
  }

  get bytes() {
    return this.keysProtobuf.PrivateKey.encode({
      Type: this.keysProtobuf.KeyType.Secp256k1,
      Data: this.marshal(),
    });
  }

  equals(key) {
    return this.bytes.equals(key.bytes);
  }

  hash() {
    return this.multihashing.hash(this.bytes);
  }
}

export class Secp256k1PrivateKeyFactory {
  constructor(
    public crypto: ImsP2pCrypto,
    public multihashing: Multihashing,
    public secp256k1PublicKey: Secp256k1PublicKeyFactory,
    public keysProtobuf: any,
  ) {}
  create(key, publicKey?: any): Secp256k1PrivateKey {
    return new Secp256k1PrivateKey(
      key,
      publicKey,
      this.crypto,
      this.multihashing,
      this.secp256k1PublicKey,
      this.keysProtobuf,
    );
  }
}
