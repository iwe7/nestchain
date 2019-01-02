import multiaddr = require('multiaddr');
import { stringify } from 'querystring';

export interface MultiaddrResult {
  host: string;
  port: number;
  transport: multiaddr.MultiaddrProto;
  family: multiaddr.MultiaddrProto;
  address: string;
  path: string;
}
export function toMulitaddr(address: string, path: string): MultiaddrResult {
  const addr = multiaddr(address);
  const protos = addr.protos();
  const opt = addr.toOptions();
  let result = {
    host: opt.host,
    port: opt.port,
    transport: protos[1],
    family: protos[0],
    address: address,
    path: path,
  };
  return result;
}
