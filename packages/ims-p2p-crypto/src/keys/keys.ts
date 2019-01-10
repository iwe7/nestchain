import crypto = require('libp2p-crypto');
import { Injectable } from 'ims-core';

@Injectable()
export class Keys {
  generateKeyPair(): Promise<any>;
  generateEphemeralKeyPair(): Promise<any>;
  keyStretcher(): Promise<any>;
  marshalPublicKey(): Promise<any>;
  unmarshalPublicKey(): any;
  marshalPrivateKey(): any;
  unmarshalPrivateKey(): any;
  import(): any;
}
