import multiaddr = require('multiaddr');

export interface MultiaddrResult {
  host: string;
  port: number;
  transport: multiaddr.MultiaddrProto;
  family: multiaddr.MultiaddrProto;
  address: string;
}
export function toMulitaddr(address: string): MultiaddrResult {
  const addr = multiaddr(address);
  const protos = addr.protos();
  const opt = addr.toOptions();
  let result = {
    host: opt.host,
    port: opt.port,
    transport: protos[1],
    family: protos[0],
    address: address
  };
  return result;
}
