declare module 'libp2p' {
  import PeerInfo = require('peer-info');
  import PeerId = require('peer-info');
  import multiaddr = require('multiaddr');
  import { Connection } from 'interface-connection';
  interface LibP2pOnType {
    on(type: 'start', fn: () => any): void;
    on(type: 'stop', fn: () => any): void;
    on(type: 'error', fn: (err?: Error) => any): void;
    on(type: 'peer:discovery', fn: (peer?: any) => any): void;
    on(type: 'peer:connect', fn: (peer?: any) => any): void;
    on(type: 'peer:disconnect', fn: (peer?: any) => any): void;
    on(type: string, fn: (...args: any[]) => any): void;
  }
  class Dnt {
    put(key, value, callback): void;
    get(key, options, callback): void;
    getMany(key, nVals, options, callback): void;
  }
  class PeerRouting {
    findPeer(id, options, callback): any;
  }
  class LibP2p {
    static start(callback: (err: Error) => any): any;
    static stop(callback: (err: Error) => any): any;
    static dial(
      peer: PeerInfo | PeerId | multiaddr.Multiaddr,
      callback: (err: Error, conn: Connection) => any,
    ): any;
    static dialProtocol(
      peer: PeerInfo | PeerId | multiaddr.Multiaddr,
      protocol: string,
      callback: (err: Error, conn: Connection) => any,
    ): any;
    static dialFSM(
      peer: PeerInfo | PeerId | multiaddr.Multiaddr,
      protocol: string,
      callback: (err: Error, conn: Connection) => any,
    ): any;
    static hangUp(
      peer: PeerInfo | PeerId | multiaddr.Multiaddr,
      callback: (err: Error) => any,
    ): any;
    static handle(
      protocol: string,
      handlerFunc: (protocol: string, conn: Connection) => any,
      matchFunc?: Function,
    ): any;
    static unhandle(protocol: string): any;
    static on: LibP2pOnType;
    static isStarted(): boolean;
    static ping(
      peer: PeerInfo | PeerId | multiaddr.Multiaddr,
      options?: any,
      callback?: any,
    ): any;
    static peerBook: any;
    static peerInfo: PeerInfo;
    static pubsub: any;
    static dht: Dnt;
    static stats: any;
    static peerRouting: PeerRouting;
  }
  namespace LibP2p {}
  export = LibP2p;
}
