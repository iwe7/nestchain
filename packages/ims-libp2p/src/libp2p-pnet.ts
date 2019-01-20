import { Injectable } from 'ims-core';
const Protector = require('libp2p-pnet')
@Injectable({
  providedIn: 'root',
  useValue: Protector,
})
export class ImsLibp2pPnet {}
