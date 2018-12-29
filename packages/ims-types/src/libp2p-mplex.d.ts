declare module 'libp2p-mplex' {
  function create(rawConn: any, isListener: boolean): any;
  namespace create {
    const multicodec: '/mplex/6.7.0';
    function dialer(conn: any): any;
    function listener(conn: any): any;
  }
  export = create;
}
