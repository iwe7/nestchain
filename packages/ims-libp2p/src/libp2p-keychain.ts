import { Injectable } from 'ims-core';
const keychain = require('libp2p-keychain');
@Injectable({
  providedIn: 'root',
  useValue: keychain,
})
export class ImsLibp2pKeychain {}
