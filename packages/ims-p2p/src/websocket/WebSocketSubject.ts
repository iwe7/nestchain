import { Subscriber, PartialObserver, AnonymousSubject } from 'ims-rxjs';
import WebSocket = require('ws');
import http = require('http');

export class WebSocketSubject<T = any> extends AnonymousSubject<T> {
  subscriber: WebSocketSubscriber;
  constructor(private socket: WebSocket) {
    super();
  }
  _subscribe(subscriber: Subscriber<T>): WebSocketSubscriber {
    if (this.subscriber) return this.subscriber;
    this.subscriber = new WebSocketSubscriber(subscriber, this.socket);
    return this.subscriber;
  }
  close(code?: number, data?: string) {
    this.socket.close(code, data);
    super.complete();
  }

  on(event: string): void {
    this.subscriber.on(event);
  }

  ons(events: string[]): void {
    events.forEach(event => this.on(event));
  }

  next(
    data: T,
    options?: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
  ) {
    this.socket.send(data, options);
  }
  ping(data?: any, mask?: boolean) {
    this.socket.ping(data, mask);
  }
  pong(data?: any, mask?: boolean) {
    this.socket.pong(data, mask);
  }
}

export class WebSocketSubscriber extends Subscriber<{
  type: string;
  payload?: any;
}> {
  constructor(destination: PartialObserver<any>, private socket: WebSocket) {
    super(destination);
    this.socket.on('message', (data: WebSocket.Data) => {
      this.next({
        type: 'message',
        payload: data,
      });
    });
    this.socket.on('error', (err: Error) => {
      this.error(err);
    });
    this.socket.on('close', () => {
      this.complete();
    });
    this.socket.on('open', () => {
      this.next({
        type: 'open',
      });
    });
    this.socket.on('ping', (data: Buffer) => {
      this.next({
        type: 'ping',
        payload: data,
      });
    });
    this.socket.on('pong', (data: Buffer) => {
      this.next({
        type: 'ping',
        payload: data,
      });
    });
    this.socket.on(
      'unexpected-response',
      (request: http.ClientRequest, response: http.IncomingMessage) => {
        this.next({
          type: 'ping',
          payload: [request, response],
        });
      },
    );
  }

  on(event: string) {
    this.socket.on(event, (...args: any[]) => {
      this.next({
        type: 'event',
        payload: args,
      });
    });
  }
}
