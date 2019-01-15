import { Injectable, PeerId } from 'ims-core';
import peerInfo = require('peer-info');
@Injectable({
  providedIn: 'root',
})
export class PeerInfoFactory {
  constructor() {}
  create(peerId: PeerId) {
    return new peerInfo(peerId);
  }
}
