import { Subject } from 'ims-rxjs';

/**
 * Transports 接口
 */
export abstract class Transport extends Subject<any> {
  abstract connect(ma: Multiaddr): any;
}

import net = require('net');
import { Multiaddr } from 'ims-core';
import toPull = require('stream-to-pull-stream');
export class TcpTransport extends Transport {
  connect(ma: Multiaddr): any {
    let opts = ma.toOptions();
    let socket = net.connect({
      port: opts.port,
      host: opts.host,
      family: opts.family,
    });
    socket.once('timeout', () => {
      this.error(new Error(`Timeout`));
    });
    let errorCallback = e => {
      this.error(e);
    };
    socket.once('error', errorCallback);
    socket.once('connect', () => {
      socket.removeListener('error', errorCallback);
    });
    const soc = toPull.duplex(socket)
  }
}
