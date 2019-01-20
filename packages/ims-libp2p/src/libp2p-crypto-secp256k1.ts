import { Injectable } from 'ims-core';
const cryptosecp256k1 = require('libp2p-crypto-secp256k1');
@Injectable({
  providedIn: 'root',
  useValue: cryptosecp256k1,
})
export class ImsLibp2pCryptoSecp256k1 {}
