import http = require('http');
import net = require('net');
import { Type, IInjector, iInjectorToArray } from 'ims-core';
import express = require('express');
import { createHttp } from 'ims-http';
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
    public routes: IInjector = [],
  ) {
    let app = express();
    let routesConfig = iInjectorToArray(this.routes).map(it => createHttp(it));
    routesConfig.map(routes => {
      let router = app.route(routes.prefix);
      routes.children.map(route => {
        if (router[route.method]) {
          router[route.method](route.path, (req, res, next) => {
            route.action(req, res, next);
          });
        }
      });
    });
    let server = new http.Server(app);
    this.server = new this.typeHttpServer(server);
    server.listen(options);
  }
}
