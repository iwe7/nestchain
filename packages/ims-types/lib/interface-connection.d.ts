declare module 'interface-connection' {
  export class Connection {
    readonly source: any;
    readonly sink: any;
    constructor(conn, info);
    getPeerInfo(callback: Function): any;
    setPeerInfo(peerInfo): any;
    getObservedAddrs(callback: Function): any;
    setInnerConn(conn, info): any;
  }
}
