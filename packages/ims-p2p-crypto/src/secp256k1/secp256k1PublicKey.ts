import { ImsP2pCrypto } from './crypto';
import { Multihashing } from 'ims-multihash';
export class Secp256k1PublicKey {
  _key: any;
  constructor(
    key,
    public crypto: ImsP2pCrypto,
    public multihashing: Multihashing,
    public keysProtobuf: any,
  ) {
    this.crypto.validatePublicKey(key);
    this._key = key;
  }

  verify(data, sig) {
    return this.crypto.hashAndVerify(this._key, sig, data);
  }

  marshal() {
    return this.crypto.compressPublicKey(this._key);
  }

  get bytes() {
    return this.keysProtobuf.PublicKey.encode({
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

export class Secp256k1PublicKeyFactory {
  constructor(
    public crypto: ImsP2pCrypto,
    public multihashing: Multihashing,
    public keysProtobuf: any,
  ) {}
  create(bytes): Secp256k1PublicKey {
    return new Secp256k1PublicKey(
      bytes,
      this.crypto,
      this.multihashing,
      this.keysProtobuf,
    );
  }
}
