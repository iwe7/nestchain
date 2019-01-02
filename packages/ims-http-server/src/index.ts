import http = require('http');
import net = require('net');
import { Type } from 'ims-core';

export abstract class HttpServer {
  constructor(public server: http.Server) {
    this.server.on('close', this.onClose.bind(this));
    this.server.on('connection', this.onConnection.bind(this));
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));
  }
  abstract onClose(): any;
  abstract onConnection(socket: net.Socket): any;
  abstract onError(err: Error): any;
  abstract onListening(): any;
}
export class HttpServerDefault extends HttpServer {
  onClose(): any {
    console.log('on close');
  }
  onConnection(socket: net.Socket): any {
    console.log('on connection');
  }
  onError(err: Error): any {
    throw err;
  }
  onListening(): any {
    console.log('on listening');
  }
}
export class ImsHttpServer {
  req: http.IncomingMessage;
  res: http.OutgoingMessage;
  server: HttpServer;
  constructor(
    options: net.ListenOptions,
    public typeHttpServer: Type<HttpServer> = HttpServerDefault,
  ) {
    let server: http.Server = http.createServer(
      (req: http.IncomingMessage, res: http.OutgoingMessage) => {
        this.req = req;
        this.res = res;
        let method = this.req.method.toLowerCase();
        this.res.end(method);
      },
    );
    this.server = new this.typeHttpServer(server);
    server.listen(options);
  }
}
