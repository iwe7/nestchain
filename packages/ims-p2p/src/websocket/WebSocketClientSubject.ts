import {
  Subscriber,
  PartialObserver,
  AnonymousSubject,
  BehaviorSubject,
} from 'ims-rxjs';
import WebSocket = require('ws');
import { WebSocketSubject } from './WebSocketSubject';
import { filter, take, tap } from 'ims-rxjs/operators';
import { Observable } from 'ims-core';

export class WebSocketClientSubject<T = any> extends AnonymousSubject<T> {
  subscriber: WebSocketClientSubscriber;
  constructor(
    private address: string,
    private options?: WebSocket.ClientOptions,
  ) {
    super();
  }
  _subscribe(subscriber: Subscriber<T>): WebSocketClientSubscriber {
    if (this.subscriber) return this.subscriber;
    this.subscriber = new WebSocketClientSubscriber(
      subscriber,
      this.address,
      this.options,
    );
    return this.subscriber;
  }

  async send(
    data: any,
    options?: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
  ) {
    if (this.subscriber) {
      await this.subscriber.send(data, options);
    }
  }
}

export class WebSocketClientSubscriber extends Subscriber<{
  type: string;
  payload: any[];
}> {
  socket: WebSocketSubject<any>;
  onOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    destination: PartialObserver<any>,
    address: string,
    options?: WebSocket.ClientOptions,
  ) {
    super(destination);
    let socket = new WebSocket(address, options);
    this.socket = new WebSocketSubject(socket);
    this.socket.subscribe(res => {
      if (res.type === 'open') {
        this.onOpen.next(true);
      }
      this.next(res);
    });
  }

  async send(
    data: any,
    options?: {
      mask?: boolean;
      binary?: boolean;
      compress?: boolean;
      fin?: boolean;
    },
  ) {
    await this.onOpen
      .pipe(
        filter(it => !!it),
        take(1),
      )
      .toPromise();
    this.socket.next(data, options);
  }

  on(event: string) {
    this.socket.on(event);
  }

  ons(events: string[]) {
    events.forEach(event => this.on(event));
  }

  close(code?: number, data?: string) {
    this.socket.close(code, data);
  }

  ping(data?: any, mask?: boolean) {
    this.socket.ping(data, mask);
  }
}
