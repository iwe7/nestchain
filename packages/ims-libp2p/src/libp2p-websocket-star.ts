import { Injectable } from 'ims-core';
const WSStar = require('libp2p-websocket-star');
@Injectable({
  providedIn: 'root',
  useValue: WSStar,
})
export class ImsLibp2pWebsocketStar {}
