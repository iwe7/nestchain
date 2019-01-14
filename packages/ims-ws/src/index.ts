import { NgModule, Injectable } from 'ims-core';
import WebSocket = require('ws');

@Injectable({
  providedIn: 'root',
})
export class ImsWsClientFactory {
  async create(opt: WebSocket.ServerOptions): Promise<WebSocket.Server> {
    return new WebSocket.Server(opt);
  }
}
@Injectable({
  providedIn: 'root',
})
export class ImsWsServerFactory {
  async create(
    address: string,
    protocols?: string | string[],
    options?: WebSocket.ClientOptions,
  ): Promise<WebSocket> {
    return new WebSocket(address, protocols, options);
  }
}

@NgModule()
export class ImsWsModule {}
