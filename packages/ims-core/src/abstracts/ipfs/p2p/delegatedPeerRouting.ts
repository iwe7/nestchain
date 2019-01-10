import { PeerInfo } from '../peer_info';
import { PeerId } from '../peer_id';
interface FindPeerOptions {
  maxTimeout: number;
}
export abstract class DelegatedPeerRouting {
  abstract findPeer(
    id: PeerId,
    options: FindPeerOptions | number,
  ): Promise<PeerInfo>;
}
