import { Injectable, Multiaddr } from 'ims-core';
import { PeerId } from 'packages/ims-core/src/abstracts/ipfs/peer_id';
import { MultiaddrSet } from './multiaddr_set';

@Injectable()
export class PeerInfo {
  protocols: Set<any> = new Set();
  _connectedMultiaddr: any;
  constructor(public id: PeerId, public multiaddrs: MultiaddrSet) {}

  connect(ma: Multiaddr) {}
}
