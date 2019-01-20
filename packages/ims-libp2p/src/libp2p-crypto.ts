import { Injectable } from 'ims-core';
const crypto = require('libp2p-crypto');
@Injectable({
  providedIn: 'root',
  useValue: crypto,
})
export class ImsLibp2pCrypto {}
