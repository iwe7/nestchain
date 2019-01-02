import https = require('https');
import http = require('http');

import net = require('net');
import { Type } from 'ims-core';

export abstract class HttpsServer {
  constructor(public server: https.Server) {
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
export class HttpsServerDefault extends HttpsServer {
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
export type ImsHttpsServerOptions = https.ServerOptions & net.ListenOptions;
export class ImsHttpsServer {
  req: http.IncomingMessage;
  res: http.OutgoingMessage;
  server: HttpsServer;
  constructor(
    options: ImsHttpsServerOptions,
    public typeHttpServer: Type<HttpsServer> = HttpsServerDefault,
  ) {
    let {
      port,
      host,
      backlog,
      path,
      exclusive,
      readableAll,
      writableAll,
      ...opt
    } = options;
    let server: https.Server = https.createServer(
      opt,
      (req: http.IncomingMessage, res: http.OutgoingMessage) => {
        this.req = req;
        this.res = res;
        debugger;
        let method = this.req.method.toLowerCase();
        this.res.end(method);
      },
    );
    this.server = new this.typeHttpServer(server);
    server.listen({
      port,
      host,
      backlog,
      path,
      exclusive,
      readableAll,
      writableAll,
    });
  }
}
