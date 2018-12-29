/**
 * spdy协议
 */
declare module 'libp2p-spdy' {
  function create(rawConn, isListener): any;
  namespace create {
    const multicodec: '/spdy/3.1.0';
    function dialer(conn: any): any;
    function listener(conn: any): any;
  }
  export = create;
}
