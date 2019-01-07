import multiaddr = require('multiaddr');
export interface MultiaddrResult {
    host: string;
    port: number;
    transport: multiaddr.MultiaddrProto;
    family: multiaddr.MultiaddrProto;
    address: string;
    path: string;
}
export declare function toMulitaddr(address: string, path?: string): MultiaddrResult;
