import { PeerId } from './peer_id';

export abstract class PeerInfo {
  multiaddrs: MultiaddrsSet;
  abstract connect(ma): void;
  abstract disconnect(): void;
  abstract isConnected(): boolean;
}

export abstract class PeerInfoFactory {
  abstract create(peerId: PeerId): PeerInfo;
  abstract isPeerInfo(info: any): info is PeerInfo;
}

export abstract class MultiaddrsSet {
  abstract get size(): number;
  abstract add(ma): void;
  abstract addSafe(ma): void;
  abstract toArray(): any[];
  abstract forEach(fn: Function): void;
  abstract filterBy(maFmt): any;
  abstract has(ma): boolean;
  abstract delete(ma): void;
  abstract replace(existing, fresh): void;
  abstract clear(): void;
  abstract distinct(): void;
}
