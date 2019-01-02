import net = require('net');
import { ImsNetSocketDefault, ImsNetSocket } from 'ims-tcp-server';
import { Type } from 'ims-core';
export class ImsTcpClient {
  socket: ImsNetSocket;
  constructor(
    public opt: net.NetConnectOpts,
    public typeSocket: Type<ImsNetSocket> = ImsNetSocketDefault,
  ) {
    let socket = net.connect(this.opt);
    this.socket = new this.typeSocket(socket);
  }
}
