declare module 'libp2p-utp' {
  class UTP {
    dial(ma, options, callback): any;
    createListener(options, handler): any;
    filter(multiaddrs): any;
  }
  export = UTP;
}
