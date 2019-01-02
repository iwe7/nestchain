import WebSocket = require('ws');
import http = require('http');

import { Type } from 'ims-core';
export interface ImsWsClientOptions extends WebSocket.ClientOptions {
  address?: string;
}
export abstract class WsClient {
  constructor(public ws: WebSocket) {
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
export class WsClientDefault extends WsClient {
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
export class ImsWsClient {
  client: WsClient;
  constructor(
    opt: ImsWsClientOptions,
    public typeClient: Type<WsClient> = WsClientDefault,
  ) {
    let { address, ...opts } = opt;
    let client = new WebSocket(address, opts);
    this.client = new this.typeClient(client);
  }
}
