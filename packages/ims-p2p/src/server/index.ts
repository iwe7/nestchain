/**
 * tcp
 */
import { toMulitaddr } from '../util';
import net = require('net');
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import dgram = require('dgram');
export type IProtocolType =
  | 'ip4'
  | 'tcp'
  | 'udp'
  | 'dccp'
  | 'ip6'
  | 'dns4'
  | 'dns6'
  | 'dnsaddr'
  | 'sctp'
  | 'utp'
  | 'p2p'
  | 'ipfs'
  | 'http'
  | 'https'
  | 'quic'
  | 'ws'
  | 'wss'
  | 'p2p-websocket-star'
  | 'p2p-webrtc-star'
  | 'p2p-webrtc-direct'
  | 'p2p-circuit';
export function bootstrap(address: string) {
  return new Observable(obs => {
    let addr = toMulitaddr(address);
    const name: IProtocolType = addr.transport.name;
    if (name === 'tcp') {
      let server = net.createServer();
      obs.next(server);
      obs.complete();
    } else if (name === 'udp') {
      let server = dgram.createSocket('udp4');
      obs.next(server);
      obs.complete();
    } else {
      obs.error(`不支持协议${addr.transport.name}`);
    }
  });
}

bootstrap(`/ip4/127.0.0.1/http/3000`).subscribe(res => console.log(res));
