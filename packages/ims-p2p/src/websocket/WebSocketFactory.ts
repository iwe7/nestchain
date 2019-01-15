import WebSocket = require('ws');
import { Injectable } from 'ims-core';
import { WebSocketServerSubject } from './WebSocketServerSubject';
import { WebSocketClientSubject } from './WebSocketClientSubject';
import { WebSocketSubject } from './WebSocketSubject';

@Injectable({
  providedIn: 'root',
})
export class WebSocketFactory {
  createServer(options: WebSocket.ServerOptions): WebSocketServerSubject {
    return new WebSocketServerSubject(options);
  }
  createClient(
    address: string,
    options?: WebSocket.ClientOptions,
  ): WebSocketClientSubject {
    return new WebSocketClientSubject(address, options);
  }
  createSocket(socket: WebSocket): WebSocketSubject<any> {
    return new WebSocketSubject(socket);
  }
}
