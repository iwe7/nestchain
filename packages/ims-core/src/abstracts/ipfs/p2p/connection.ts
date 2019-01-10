import { PeerInfo } from '../peer_info';

export abstract class Connection {
  abstract get source(): any;
  abstract get sink(): any;

  abstract getPeerInfo(): Promise<PeerInfo>;
  abstract setPeerInfo(peerInfo: PeerInfo): void;
  abstract getObservedAddrs(): Promise<any[]>;
  abstract getInnerConn(conn: any, info: any): void;
}
