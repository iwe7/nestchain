import { BehaviorSubject, Subscription, PartialObserver } from 'ims-rxjs';

// 全局状态
export interface IState<T> {
  type: string;
  payload: T;
}

export class World {}

// 联盟链
export class Room<T> {
  state: BehaviorSubject<IState<any>>;
  subscriptions: Map<Node<any>, Subscription> = new Map();
  constructor(public name: string, public initState: IState<T>) {
    this.state = new BehaviorSubject(this.initState);
  }
  addNode(node: Node<T>) {
    this.subscriptions.set(node, this.state.subscribe(node.observer));
  }
  removeNode(node: Node<T>) {
    this.subscriptions.get(node).unsubscribe();
    this.subscriptions.delete(node);
  }
  send<T>(data: IState<T>) {
    this.state.next(data);
  }
  static create<T>(name: string, initState: IState<T>) {
    return new Room(name, initState);
  }
}

// 节点
export abstract class Node<T> {
  static subscriptions: Map<Node<any>, Subscription> = new Map();
  static initState: IState<any> = {
    type: 'init',
    payload: {},
  };
  static state: BehaviorSubject<IState<any>> = new BehaviorSubject<IState<any>>(
    Node.initState,
  );

  state: BehaviorSubject<IState<any>>;
  constructor(
    public observer: PartialObserver<IState<T>>,
    public ip: string,
    public port: number,
    public initState: IState<T>,
  ) {
    this.state = new BehaviorSubject(this.initState);
  }

  // 单聊
  abstract send<T>(data: IState<T>): void;

  // 进入房间
  joinRoom(room: Room<any>) {
    room.addNode(this);
  }

  // 离开房间
  leaveRoom(room: Room<any>) {
    room.removeNode(this);
  }

  // 房间群发
  sendRoom(room: Room<any>, data: IState<T>) {
    room.send(data);
  }

  // 群发
  static send<T>(data: IState<T>) {
    this.state.next(data);
  }

  static addNode<T>(node: Node<T>) {
    this.subscriptions.set(node, this.state.subscribe(node.observer));
  }

  static removeNode<T>(node: Node<T>) {
    this.subscriptions.get(node).unsubscribe();
    this.subscriptions.delete(node);
  }

  static create<T>(
    observer: PartialObserver<IState<T>>,
    ip: string,
    port: number,
    initState: IState<T>,
  ): Node<T> {
    let node = new NodeImpl<T>(observer, ip, port, initState);
    this.addNode(node);
    return node;
  }
}

export class NodeImpl<T> extends Node<T> {
  send<T>(data: IState<T>): void {}
}

export class P2p {}
import express = require('express');
import http = require('http');
export class Block {
  static blocksMap: Map<string, Block> = new Map();
  constructor(public data: any) {

  }
  get(req: express.Request, res: express.Response, next: express.NextFunction) {
    return this.data;
  }
  post(req: express.Request, res: express.Response, next: express.NextFunction) {
    return this.data;
  }
  static get(key: string): Block {
    return this.blocksMap.get(key);
  }
  static create(key: string, data: any) {
    let block = new Block(data);
    this.blocksMap.set(key, block);
  }
}

let app = express();
Block.create('favicon.ico', 'favicon.ico');

// 获取区块
app.get('/:cid', (req, res, next) => {
  let block = Block.get(req.params.cid);
  if (block) {
    res.end(block.get(req, res, next));
  } else {
    res.end('404');
  }
});

// 保存区块
app.post('/:cid', (req, res, next) => {
  let block = Block.get(req.params.cid);
  if (block) {
    res.end(block.post(req, res, next));
  } else {
    res.end('404');
  }
});

app.get('*', (req, res, next) => {
  res.end('404');
});

let server = new http.Server(app);
server.listen(3000, '127.0.0.1');

let testNode = Node.create(
  {
    next: data => {
      console.log(data);
    },
  },
  '127.0.0.1',
  3000,
  Node.initState,
);

Node.send({
  type: 'send',
  payload: 'test',
});
