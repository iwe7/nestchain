declare module 'libp2p-websocket-star' {
  class WebsocketStar {
    constructor(options);
    lazySetId(id): any;
    dial(ma, options, callback): any;
    createListener(options, handler): any;
    filter(multiaddrs): any;
    _peerDiscovered(maStr: string): any;
  }
  export = WebsocketStar;
}
