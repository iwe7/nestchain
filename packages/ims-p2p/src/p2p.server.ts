import { Observable, Subscriber, TeardownLogic, PartialObserver } from 'rxjs';
import SocketCluster = require('socketcluster');
import { SCServer } from 'socketcluster-server';
import path = require('path');
export enum P2pState {
  banned,
  unbanned,
  active,
}
export interface P2pOptions {
  // ip地址
  ip: string;
  // http 端口
  httpPort: number;
  // ws 端口
  wsPort: number;
  // 系统
  os: string;
  // 版本号
  version: string;
  // 高度
  height: number;
  // 验证
  nonce: string;
  // 锁定日期
  clock: Date;
  // 更新日期
  updated: Date;
  // hash
  broadhash: string;
  // string
  string: string;
}
export class P2pObservable<T> extends Observable<T> {
  constructor(private options: P2pOptions) {
    super();
  }
  next(data: T) {}
  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    return new P2pSubscriber(subscriber, this.options);
  }
}
export class P2pSubscriber<T> extends Subscriber<T> {
  constructor(dest: PartialObserver<T>, public options: P2pOptions) {
    super(dest);
    // 多播
    const workersControllerPath = path.join(__dirname, 'workers.controller');
    const webSocketConfig: SCServer.SCServerOptions = {
      // todo
      workers: 2,
      // todo
      port: 9001,
      host: '0.0.0.0',
      // todo
      wsEngine: 'ws',
      appName: 'ims',
      workerController: workersControllerPath,
      perMessageDeflate: false,
      secretKey: 'imsSecretKey',
      // Because our node is constantly sending messages, we don't
      // need to use the ping feature to detect bad connections.
      pingTimeoutDisabled: true,
      // Maximum amount of milliseconds to wait before force-killing
      // a process after it was passed a 'SIGTERM' or 'SIGUSR2' signal
      processTermTimeout: 10000,
      logLevel: 0,
    };
    let socket = new SocketCluster(webSocketConfig);
  }
  next(data: T) {
    this.destination.next(data);
  }
}
