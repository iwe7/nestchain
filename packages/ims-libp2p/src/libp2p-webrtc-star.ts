import { Injectable } from 'ims-core';
const WStar = require('libp2p-webrtc-star');
@Injectable({
  providedIn: 'root',
  useValue: WStar,
})
export class ImsLibp2pWebrtcStar {}
