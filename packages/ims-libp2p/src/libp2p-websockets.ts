import { Injectable } from 'ims-core';
const WS = require('libp2p-websockets');
@Injectable({
  providedIn: 'root',
  useValue: WS,
})
export class ImsLibp2pWebsocket {}
