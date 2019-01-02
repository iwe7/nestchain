import net = require('net');
import { Type } from 'ims-core';
export { Socket } from 'net';
export abstract class ImsNetSocket {
  constructor(public socket: net.Socket) {
    socket.on('close', this.onClose.bind(this));
    socket.on('connect', this.onListener.bind(this));
    socket.on('data', this.onData.bind(this));
    socket.on('drain', this.onDrain.bind(this));
    socket.on('end', this.onEnd.bind(this));
    socket.on('error', this.onError.bind(this));
    socket.on('lookup', this.onLookUp.bind(this));
    socket.on('timeout', this.onTimeout.bind(this));
  }
  abstract onClose(had_error: boolean): any;
  abstract onListener(): any;
  abstract onData(data: Buffer): any;
  abstract onDrain(): any;
  abstract onEnd(): any;
  abstract onError(err: Error): any;
  abstract onLookUp(
    err: Error,
    address: string,
    family: string | number,
    host: string,
  ): any;
  abstract onTimeout(): any;
}
export class ImsNetSocketDefault extends ImsNetSocket {
  onClose(had_error: boolean): any {
    console.log('on close');
  }
  onListener(): any {
    this.socket.write(
      JSON.stringify({
        type: 'listener',
      }),
    );
  }
  onData(data: Buffer): any {
    console.log('on data');
  }
  onDrain(): any {
    console.log('on drain');
  }
  onEnd(): any {
    console.log('on end');
  }
  onError(err: Error): any {
    throw err;
  }
  onLookUp(
    err: Error,
    address: string,
    family: string | number,
    host: string,
  ): any {
    console.log('on look up');
  }
  onTimeout(): any {
    console.log('on timeout');
  }
}
export abstract class ImsNetServer<S extends ImsNetSocket = any> {
  connection: S;
  constructor(
    public server: net.Server,
    public typeSocket: Type<S> = ImsNetSocketDefault as Type<S>,
  ) {
    server.on('listening', this.onListening.bind(this));
    server.on('error', this.onError.bind(this));
    server.on('close', this.onClose.bind(this));
    server.on('connection', this.onConnection.bind(this));
  }
  abstract onClose(): any;
  abstract onError(err: Error): any;
  abstract onListening(): any;
  abstract onConnection(socket: net.Socket): any;
}
export class ImsNetServerDefault<
  S extends ImsNetSocket = any
> extends ImsNetServer<S> {
  onClose() {
    console.log('on close');
  }
  onError(err: Error) {
    console.log('on error');
  }
  onListening() {
    console.log('on listening');
  }
  onConnection(socket: net.Socket) {
    this.connection = new this.typeSocket(socket);
  }
}
export class ImsTcpServer<S extends ImsNetServer> {
  server: S;
  constructor(
    public opt: net.ListenOptions,
    public typeServer: Type<S> = ImsNetServerDefault as Type<S>,
  ) {
    let server = net.createServer();
    this.server = new typeServer(server);
    server.listen(opt);
  }
}
