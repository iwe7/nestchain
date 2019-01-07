declare module 'libp2p-secio' {
  const secio: {
    tag: '/secio/1.0.0';
    encrypt(localId, conn, remoteId, callback): any;
  };
  export = secio;
}
