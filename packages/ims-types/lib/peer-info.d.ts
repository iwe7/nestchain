declare module 'peer-info' {
  import PeerId = require('peer-id');
  class MultiaddrSet {
    readonly size: number;
    constructor(multiaddrs: any[]);
    add(ma: any): void;
    addSafe(ma: any): void;
    toArray(): any[];
    forEach(fn: (...args: any[]) => any): any;
    filterBy(maFmt: any): any[];
    has(ma: any): boolean;
    delete(ma: any): void;
    replace(existing: any, fresh: any): any;
    clear(): void;
    distinct(): any;
  }
  class PeerInfo {
    multiaddrs: MultiaddrSet;
    id: PeerId;
    protocols: Set<any>;
    constructor(id?: any);
    connect(ma: any): any;
    disconnect(): any;
    isConnected(): boolean;
    static create(peerId?: any, callback?: any): PeerInfo;
    static isPeerInfo(peerInfo: any): peerInfo is PeerInfo;
  }
  export = PeerInfo;
}
