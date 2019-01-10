import { PeerInfo } from './peer_info';
import { PeerId } from './peer_id';
import { Cid } from '../cid';
import { IpfsBlock } from './block';

/**
 * 数据交换协议
 */
export abstract class Bitswap {
  abstract get peerInfo(): PeerInfo;
  abstract enableStats(): void;
  abstract disableStats(): void;
  abstract wantlistForPeer(peerId: PeerId): any;
  abstract ledgerForPeer(peerId: PeerId): any;
  abstract get(cid: Cid): Promise<IpfsBlock>;
  abstract getMany(cids: Cid[]): Promise<IpfsBlock[]>;
  abstract unwant(cids: Cid[]): void;
  abstract cancelWants(cids: Cid[]): void;
  abstract put(block: IpfsBlock): Promise<void>;
  abstract putMany(blocks: IpfsBlock[]): Promise<void>;
  abstract getWantlist(): any[];
  abstract peers(): PeerId[];
  abstract stat(): any;
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
}
