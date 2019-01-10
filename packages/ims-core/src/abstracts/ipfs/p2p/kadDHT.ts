import { PeerInfo } from '../peer_info';
import { PeerBook } from '../peer_book';
import { PeerId } from '../peer_id';
import { Cid } from '../../cid';

export abstract class KadDHT {
  abstract get isStarted(): boolean;
  abstract get peerInfo(): PeerInfo;
  abstract get peerBook(): PeerBook;
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract put(key: Buffer, value: Buffer): Promise<void>;
  abstract get(
    key: Buffer,
    options: {
      timeout: number;
    },
  ): Promise<Buffer>;
  abstract getMany(
    key: Buffer,
    nvals: number,
    options: object,
  ): Promise<{ from: PeerId; val: Buffer }[]>;
  abstract getClosestPeers(key: Buffer): Promise<PeerId[]>;
  abstract getPublicKey(peer: PeerId): Promise<String>;
  abstract findPeerLocal(peer: PeerId): Promise<PeerInfo>;
  abstract provide(key: Cid): Promise<void>;
  abstract findProviders(key: Cid, options: object): Promise<PeerInfo[]>;
  abstract findPeer(id: PeerId, options: object): Promise<PeerInfo>;
}
