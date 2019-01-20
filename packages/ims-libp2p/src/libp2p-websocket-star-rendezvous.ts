import { Injectable } from 'ims-core';
const WStar = require('libp2p-websocket-star-rendezvous');
@Injectable({
  providedIn: 'root',
  useValue: WStar,
})
export class ImsLibp2pWebsocketStarRendzvous {}
