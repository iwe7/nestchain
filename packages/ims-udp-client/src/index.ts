import {
  ImsUdpSocketDefault as ImsUdpServerSocketDefault,
  ImsUdpSocket as ImsUdpClientSocket,
} from 'ims-udp-server';
import dgram = require('dgram');
import net = require('net');

import { Type } from 'ims-core';
export abstract class ImsUdpSocket extends ImsUdpClientSocket {
  port: number;
  address: string;
  abstract send(data: Buffer | string | Uint8Array | any[]): any;
}
export class ImsUdpSocketDefault extends ImsUdpSocket {
  onClose(): any {
    console.log('on close');
  }
  onError(err: Error): any {
    throw err;
  }
  onListening(): any {
    console.log('on listening');
  }
  onMessage(msg: Buffer, rinfo: net.AddressInfo): any {
    console.log('on message');
  }
  send(data: Buffer | string | Uint8Array) {
    this.socket.send(data, 0, data.length, this.port, this.address);
  }
}
export interface ImsUdpServerOptions extends dgram.SocketOptions {
  port: number;
  host: string;
}
export class ImsUdpClient {
  socket: ImsUdpSocket;
  constructor(
    opt: ImsUdpServerOptions,
    public typeSocket: Type<ImsUdpSocket> = ImsUdpSocketDefault,
  ) {
    let { port, host, ...opts } = opt;
    let socket = dgram.createSocket(opts);
    this.socket = new this.typeSocket(socket);
    this.socket.port = port;
    this.socket.address = host;
  }
  send(data: Buffer | string | Uint8Array) {
    this.socket.send(data);
  }
}
