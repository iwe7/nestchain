declare module 'libp2p-webrtc-star' {
  class WebRTCStar {
    constructor(options: any);
    dial(ma, options, callback): any;
    createListener(options, handler): any;
    filter(multiaddrs): any;
    _peerDiscovered(maStr: string): any;
  }
}
