import dgram = require('dgram');
import net = require('net');
import { Type } from 'ims-core';
export abstract class ImsUdpSocket {
  constructor(public socket: dgram.Socket) {
    this.socket.on('close', this.onClose.bind(this));
    this.socket.on('error', this.onError.bind(this));
    this.socket.on('listening', this.onListening.bind(this));
    this.socket.on('message', this.onMessage.bind(this));
  }
  abstract onClose(): any;
  abstract onError(err: Error): any;
  abstract onListening(): any;
  abstract onMessage(msg: Buffer, rinfo: net.AddressInfo): any;
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
}
export interface ImsUdpServerOptions extends dgram.SocketOptions {
  port: number;
  host: string;
}
export class ImsUdpServer {
  socket: ImsUdpSocket;
  constructor(
    opt: ImsUdpServerOptions,
    public typeSocket: Type<ImsUdpSocket> = ImsUdpSocketDefault,
  ) {
    let { port, host, ...opts } = opt;
    let socket = dgram.createSocket(opts);
    this.socket = new this.typeSocket(socket);
    socket.bind(port, host);
  }
}
