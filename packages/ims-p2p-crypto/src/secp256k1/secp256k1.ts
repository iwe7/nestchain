import { Injectable } from 'ims-core';
import { Secp256k1PrivateKeyFactory } from './secp256k1PrivateKey';
import { Secp256k1PublicKeyFactory } from './secp256k1PublicKey';
import { ImsP2pCrypto } from './crypto';
import { Multihashing } from 'ims-multihash';

export class Secp256k1 {
  public secp256k1PrivateKeyFactory: Secp256k1PrivateKeyFactory;
  public secp256k1PublicKeyFactory: Secp256k1PublicKeyFactory;

  constructor(
    randomBytes: any,
    keysProtobuf: any,
    public crypto: ImsP2pCrypto,
    public multihashing: Multihashing,
  ) {
    this.crypto = new ImsP2pCrypto(this.multihashing, randomBytes);
    this.secp256k1PublicKeyFactory = new Secp256k1PublicKeyFactory(
      this.crypto,
      this.multihashing,
      keysProtobuf,
    );
    this.secp256k1PrivateKeyFactory = new Secp256k1PrivateKeyFactory(
      this.crypto,
      this.multihashing,
      this.secp256k1PublicKeyFactory,
      keysProtobuf,
    );
  }
  unmarshalSecp256k1PrivateKey(bytes) {
    return this.secp256k1PrivateKeyFactory.create(bytes);
  }
  unmarshalSecp256k1PublicKey(bytes) {
    return this.secp256k1PublicKeyFactory.create(bytes);
  }
  async generateKeyPair() {
    let privateKeyBytes = await this.crypto.generateKey();
    let privkey = this.unmarshalSecp256k1PrivateKey(privateKeyBytes);
    return privkey;
  }
}
@Injectable({
  providedIn: 'root',
})
export class Secp256k1Factory {
  constructor(public crypto: ImsP2pCrypto, public multihashing: Multihashing) {}
  create(keysProtobuf, randomBytes) {
    return new Secp256k1(
      randomBytes,
      keysProtobuf,
      this.crypto,
      this.multihashing,
    );
  }
}
