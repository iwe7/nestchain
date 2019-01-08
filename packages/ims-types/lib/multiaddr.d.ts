declare module 'multiaddr' {
  function multiaddr(addr: string): multiaddr.Multiaddr;
  namespace multiaddr {
    interface MultiaddrProto {
      code: number;
      size: number;
      name: string;
    }
    interface MultiaddrOptions {
      family: string;
      host: string;
      port: number;
      transport: string;
    }
    class Multiaddr {
      protos(): MultiaddrProto[];
      toOptions(): MultiaddrOptions;
    }
  }
  export = multiaddr;
}
