import { EventEmitter } from 'events';
import dgram = require('dgram');
import { ImsDns } from './dns';
var multicastDns = require('multicast-dns');
export interface ImsMulticastDnsOptions {
  port?: number;
  type?: 'udp6' | 'udp4';
  ip?: string;
  host?: string;
  interface?: any;
  socket?: dgram.Socket;
  reuseAddr?: boolean;
}
export class ImsMulticastDns extends EventEmitter {
  static defaultOptions: ImsMulticastDnsOptions = {
    port: 5353,
    type: 'udp4',
    ip: null,
    host: null,
    reuseAddr: false,
  };
  constructor(opts: ImsMulticastDnsOptions = {}) {
    super();
    opts = { ...ImsMulticastDns.defaultOptions, ...opts };
    let { type, port, ip, host, socket, reuseAddr } = opts;
    ip = ip || host || (type === 'udp4' ? '224.0.0.251' : null);
    let me = { address: ip, port: port };
    if (type === 'udp6' && (!ip || !opts.interface)) {
      throw new Error(
        'For IPv6 multicast you must specify `ip` and `interface`',
      );
    }
    socket =
      socket ||
      dgram.createSocket({
        type,
        reuseAddr: reuseAddr !== false,
      });
    socket.on('error', (err: any) => {
      if (err.code === 'EACCES' || err.code === 'EADDRINUSE')
        this.emit('error', err);
      else this.emit('warning', err);
    });
    socket.on('message', (message: any, rinfo) => {
      try {
        message = ImsDns.decode(message);
      } catch (err) {
        this.emit('warning', err);
        return;
      }
      this.emit('packet', message, rinfo);
      if (message.type === 'query') this.emit('query', message, rinfo);
      if (message.type === 'response') this.emit('response', message, rinfo);
    });
  }
  static query() {}
}
