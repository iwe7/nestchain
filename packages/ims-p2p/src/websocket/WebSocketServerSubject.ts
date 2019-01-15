import { Subscriber, PartialObserver, AnonymousSubject } from 'ims-rxjs';
import WebSocket = require('ws');
import http = require('http');
import { WebSocketSubject } from './WebSocketSubject';

export class WebSocketServerSubject<T = any> extends AnonymousSubject<T> {
  private subscriber: WebSocketServerSubscriber;
  constructor(public options: WebSocket.ServerOptions) {
    super();
  }
  _subscribe(subscriber: Subscriber<T>): WebSocketServerSubscriber {
    if (this.subscriber) return this.subscriber;
    this.subscriber = new WebSocketServerSubscriber(subscriber, this.options);
    return this.subscriber;
  }

  bordcast(
    data: any,
    options?: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
  ) {
    this.subscriber.bordcast(data, options);
  }
}

export class WebSocketServerSubscriber extends Subscriber<{
  type: string;
  payload: any[];
}> {
  server: WebSocket.Server;
  connections: Set<WebSocketSubject> = new Set();
  constructor(
    destination: PartialObserver<any>,
    options: WebSocket.ServerOptions,
  ) {
    super(destination);
    this.server = new WebSocket.Server(options);
    /**
     * 建立链接
     */
    this.server.on(
      'connection',
      (socket: WebSocket, request: http.IncomingMessage) => {
        let client = new WebSocketSubject(socket);
        /**
         * 来自客户端的消息
         */
        this.connections.add(client);
        this.next({
          type: 'connection',
          payload: [client, request],
        });
      },
    );
    this.server.on('error', err => this.error(err));
    this.server.on(
      'headers',
      (headers: string[], request: http.IncomingMessage) => {
        this.next({
          type: 'headers',
          payload: [headers, request],
        });
      },
    );
    this.server.on('listening', () => {
      this.next({
        type: 'listening',
        payload: [],
      });
    });
  }

  get address() {
    return this.server.address();
  }

  bordcast(
    data: any,
    options?: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
  ) {
    this.connections.forEach(conn => conn.next(data, options));
  }

  on(event: string) {
    this.server.on(event, (...args: any[]) => {
      this.next({
        type: event,
        payload: args,
      });
    });
  }

  next(data: any) {
    super.next(data);
  }

  error(err: any) {
    this.server.close();
    this.server.removeAllListeners();
    super.error(err);
  }

  complete() {
    this.server.close();
    this.server.removeAllListeners();
    super.complete();
  }
}
