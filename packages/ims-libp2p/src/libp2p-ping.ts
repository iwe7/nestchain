import { Injectable } from 'ims-core';
const ping = require('libp2p-ping');
@Injectable({
  providedIn: 'root',
  useValue: ping,
})
export class ImsLibp2pPing {}
