import { Injectable, PeerInfoFactory, PeerId, PeerInfo } from 'ims-core';
import peerInfo = require('peer-info');
@Injectable()
export class PeerInfoFactoryImpl extends PeerInfoFactory {
  create(peerId: PeerId): PeerInfo {
    return new peerInfo(peerId);
  }
  isPeerInfo(info: any): info is PeerInfo {
    return typeof info === 'object' && info.id && info.multiaddrs;
  }
}
