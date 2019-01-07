declare module 'libp2p-websockets' {
  class WebSockets {
    dial(ma, options, callback): any;
    createListener(options, handler): any;
    filter(multiaddrs): any;
  }
  export = WebSockets;
}
