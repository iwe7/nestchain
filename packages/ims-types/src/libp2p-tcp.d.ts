declare module 'libp2p-tcp' {
  class TCP {
    dial(ma, options, callback): any;
    createListener(options, handler): any;
    filter(multiaddrs): any;
  }
  export = TCP;
}
