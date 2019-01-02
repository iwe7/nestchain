import WebSocket = require('ws');
import http = require('http');

import { Type } from 'ims-core';
export abstract class WsConnection {
  constructor(public ws: WebSocket, public request: http.IncomingMessage) {
    this.ws.on('message', this.onMessage.bind(this));
    this.ws.on('error', this.onError.bind(this));
    this.ws.on('close', this.onClose.bind(this));
    this.ws.on('open', this.onOpen.bind(this));
    this.ws.on('upgrade', this.onUpgrade.bind(this));
    this.ws.on('ping', this.onPing.bind(this));
    this.ws.on('pong', this.onPong.bind(this));
    this.ws.on('unexpected-response', this.onUnexpectedResponse.bind(this));
  }
  abstract onUpgrade(request: http.IncomingMessage): any;
  abstract onPing(data: Buffer): any;
  abstract onPong(data: Buffer): any;
  abstract onMessage(data: WebSocket.Data): any;
  abstract onUnexpectedResponse(
    request: http.ClientRequest,
    response: http.IncomingMessage,
  ): any;
  abstract onError(err: Error): any;
  abstract onClose(code: number, reason: string): any;
  abstract onOpen(): any;
}
export class WsConnectionDefault extends WsConnection {
  onUpgrade(request: http.IncomingMessage): any {
    console.log('on upgrade');
  }
  onPing(data: Buffer): any {
    console.log('on ping');
  }
  onPong(data: Buffer): any {
    console.log('on pong');
  }
  onMessage(data: WebSocket.Data): any {
    console.log('on message');
  }
  onUnexpectedResponse(
    request: http.ClientRequest,
    response: http.IncomingMessage,
  ): any {
    console.log('on unexpected response');
  }
  onError(err: Error): any {
    throw err;
  }
  onClose(code: number, reason: string): any {
    console.log('on close');
  }
  onOpen(): any {
    console.log('on open');
    this.ws.send('open');
  }
}
export abstract class WsServer {
  constructor(
    public server: WebSocket.Server,
    public typeConection: Type<WsConnection> = WsConnectionDefault,
  ) {
    this.server.on('connection', this.onConnection.bind(this));
    this.server.on('error', this.onError.bind(this));
    this.server.on('headers', this.onHeaders.bind(this));
    this.server.on('listening', this.onListening.bind(this));
    this.server.on('message', this.onMessage.bind(this));
  }
  abstract onMessage(data: Buffer): any;
  abstract onListening(): any;
  abstract onHeaders(headers: string[], request: http.IncomingMessage): any;
  abstract onError(err: Error): any;
  abstract onConnection(socket: WebSocket, request: http.IncomingMessage): any;
}
export class WsServerDefault extends WsServer {
  onListening(): any {
    console.log('on listening');
  }
  onHeaders(headers: string[], request: http.IncomingMessage): any {
    console.log('on headers');
  }
  onError(err: Error): any {
    throw err;
  }
  onConnection(socket: WebSocket, request: http.IncomingMessage): any {
    console.log('on connection');
    return new this.typeConection(socket, request);
  }
  onMessage(data: Buffer) {
    console.log('on data');
  }
}
export class ImsWsServer {
  ws: WsServer;
  constructor(
    opt: WebSocket.ServerOptions,
    public typeWsServer: Type<WsServer> = WsServerDefault,
  ) {
    let server = new WebSocket.Server(opt);
    this.ws = new this.typeWsServer(server);
  }
}
