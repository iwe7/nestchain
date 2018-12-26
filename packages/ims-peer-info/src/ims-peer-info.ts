import PeerInfo = require('peer-info');
import { ImsPeerId } from 'ims-peer-id';
export class ImsPeerInfo {
  peerInfo: any;
  multiaddrs: MultiaddrSet;
  constructor(peerId: ImsPeerId) {
    this.peerInfo = new PeerInfo(peerId);
    this.multiaddrs = this.peerInfo.multiaddrs;
  }

  connect(ma: any) {
    return this.peerInfo.connect(ma);
  }

  disconnect() {
    return this.peerInfo.disconnect();
  }

  isConnected(): boolean {
    return this.peerInfo.isConnected();
  }

  static create(peerId: ImsPeerId, callback?: any): ImsPeerInfo {
    return PeerInfo.create(peerId, callback);
  }

  static isPeerInfo(peerInfo: any): peerInfo is ImsPeerInfo {
    return PeerInfo.isPeerInfo(peerInfo);
  }
}

export interface MultiaddrSet {
  add(ma: any): any;
  addSafe(ma: any): any;
  toArray(): any[];
  readonly size: number;
  forEach(fn: Function): any;
  filterBy(it: any): any;
  has(ma: any): boolean;
  delete(ma: any): any;
  replace(existing, fresh): any;
  clear(): void;
  distinct(): any;
}
