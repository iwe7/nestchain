import { Observable, Subscriber, TeardownLogic, PartialObserver } from 'rxjs';
import net = require('net');
import { ImsMultiaddr } from 'ims-multiaddr';
import { fromCallback } from 'ims-rxjs';
import { switchMap } from 'rxjs/operators';

export class TcpObservable<T> extends Observable<T> {
  subscriber: TcpSubscriber<T>;
  constructor() {
    super();
  }
  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    this.subscriber = new TcpSubscriber(subscriber);
  }
  send(type: string, data: T) {
    this.subscriber && this.subscriber.send(type, data);
  }
  start(address: string) {
    if (this.subscriber) {
      return this.subscriber.start(address);
    }
  }
  connect(address: string) {
    if (this.subscriber) {
      return this.subscriber.connect(address);
    }
  }
}
export class TcpSubscriber<T> extends Subscriber<T> {
  server: net.Server;
  constructor(destination: PartialObserver<any>) {
    super(destination);
    this.server = net.createServer((socket: net.Socket) => {
      this.onConnection(socket);
    });
    this.server.on('close', () => {
      this.complete();
    });
    this.server.on('connection', (socket: net.Socket) => {
      // 链接
      this.onConnection(socket);
    });
    this.server.on('error', (err: Error) => {
      this.error(err);
    });
    this.server.on('listening', () => {
      this.serverStart();
    });
  }
  send(type: string, data: any) {
    this.connections.map(connect => {
      connect.write(
        JSON.stringify({
          type,
          data,
        }),
      );
    });
  }

  start(address: string) {
    return fromCallback(opt => {
      let multiaddr = new ImsMultiaddr(address);
      let options = multiaddr.toOptions();
      this.server.listen(options.port, options.host, (...args: any[]) => {
        opt.next(null);
        opt.complete();
      });
    });
  }

  connect(address: string): Observable<net.Socket> {
    return fromCallback(opt => {
      let multiaddr = new ImsMultiaddr(address);
      let options = multiaddr.toOptions();
      let protos = multiaddr.protos();
      let connect = net.createConnection(
        {
          port: options.port,
          host: options.host,
          family: protos[0].code,
        },
        () => {
          opt.next(connect);
          opt.complete();
        },
      );
    });
  }

  // 链接
  connections: net.Socket[] = [];
  onConnection(socket: net.Socket) {
    this.connections.push(socket);
    socket.on('close', () => {});
    socket.on('connect', () => {});
    socket.on('data', (data: Buffer) => {
      // 客服机发送消息
      console.log('data');
      this.destination.next({
        type: 'message',
        data: data.toString(),
      });
    });
    socket.on('drain', () => {});
    socket.on('end', () => {});
    socket.on('error', () => {});
    socket.on('lookup', () => {});
    socket.on('timeout', () => {});
  }

  // 服务器启动
  serverStart() {
    // todo
  }

  next(data: any) {
    this.destination.next(data);
  }

  complete() {
    this.server.close();
    super.complete();
  }

  error(e: Error) {
    this.server.close();
    super.error(e);
  }
}

let tcp = new TcpObservable();
tcp.subscribe(res => console.log(res));
tcp
  .start('/ip4/127.0.0.1/tcp/1234')
  .pipe(switchMap(() => tcp.connect('/ip4/127.0.0.1/tcp/1234')))
  .subscribe(connect => {
    connect.write(`11`);
    connect.write(`22`);
    connect.end();
  });

tcp.send('message', '11133');
