import { PeerId } from './peer_id';

export abstract class PeerInfo {
  abstract connect(ma): void;
  abstract disconnect(): void;
  abstract isConnected(): boolean;
}

export abstract class PeerInfoFactory {
  abstract create(peerId: PeerId): PeerInfo;
  abstract isPeerInfo(info: any): info is PeerInfo;
}
