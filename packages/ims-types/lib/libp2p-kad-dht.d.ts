declare module 'libp2p-kad-dht' {
  class KadDHT {
    readonly isStarted: boolean;
    readonly peerInfo: any;
    readonly peerBook: any;
    put(key, value, callback): any;
    get(key, options, callback): any;
    getMany(key, nvals, options, callback): any;
    getClosestPeers(key, callback): any;
    getPublicKey(peer, callback): any;
    findPeerLocal(peer, callback): any;
    provide(key, callback): any;
    findProviders(key, options, callback): any;
    findPeer(id, options, callback): any;
    constructor(sw, options);
    start(callback): any;
    stop(callback): any;
  }
  export = KadDHT;
}
