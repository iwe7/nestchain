import { Injectable, PeerInfo, PeerBook } from 'ims-core';
import Switch = require('libp2p-switch');
export interface Libp2pSwitchOptions {
  maxOldPeersRetention?: number;
  computeThrottleMaxQueueSize?: number;
  computeThrottleTimeout?: number;
  movingAverageIntervals?: number;
}
export class Imsp2pSwitch {}
@Injectable({
  providedIn: 'root',
})
export class P2pSwitchFactory {
  constructor() {}
  create(
    peerInfo: PeerInfo,
    peerBook: PeerBook,
    options: Libp2pSwitchOptions,
  ): Imsp2pSwitch {
    return new Switch(peerInfo, peerBook, options);
  }
}
