import { PeerInfo } from './peer_info';
import { PeerId } from './peer_id';

export abstract class PeerBook {
  abstract has(peer: string | Buffer | PeerId | PeerInfo): boolean;
  abstract put(peerInfo: PeerInfo, replace: boolean): PeerInfo;
  abstract get(peer: string | Buffer | PeerId | PeerInfo): PeerInfo;
  abstract getAll(): { [key: string]: PeerInfo };
  abstract getAllArray(): PeerInfo[];
  abstract getMultiaddrs(peer: string | Buffer | PeerId | PeerInfo): any[];
  abstract remove(peer: string | Buffer | PeerId | PeerInfo): void;
}
