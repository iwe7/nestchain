import { Injectable } from 'ims-core';
const Wdirect = require('libp2p-webrtc-direct');
@Injectable({
  providedIn: 'root',
  useValue: Wdirect,
})
export class ImsLibp2pWebrtcDirect {}
