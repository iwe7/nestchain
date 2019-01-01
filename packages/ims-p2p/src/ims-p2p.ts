import { toMulitaddr, MultiaddrResult } from './util';
import net = require('net');

export class ImsP2p {
  address: MultiaddrResult;
  servers: Map<string, MultiaddrResult> = new Map();
  clients: Map<string, net.Socket> = new Map();
  constructor(address: string, servers: string[]) {
    this.address = toMulitaddr(address);
    servers
      .map(server => toMulitaddr(server))
      .forEach(ser => {
        this.servers.set(ser.address, ser);
      });
    this.initServer();
    this.initPing();
  }

  // ping 更新服务在线状态
  initPing() {
    setInterval(() => {
      this.clients.forEach((client, address) => {
        this.send(client, 'ping', { address });
      });
    }, 10000);
  }
  // 解析
  parse(str: string) {
    let datas = str.split('\n');
    if (datas.length === 2) {
      let len = parseInt(datas[0]);
      if (len === datas[1].length) {
        return JSON.parse(datas[1]);
      }
    }
    return {};
  }

  // 压缩
  stringify(type: string, data: any) {
    return JSON.stringify({
      type: type,
      payload: data,
    });
  }

  send(server: net.Socket, type: string, data: any) {
    let str = this.stringify(type, data);
    server.write(`${str.length}\n${str}`);
  }

  initServer() {
    let server = net.createServer((socket: net.Socket) => {
      socket.setEncoding('utf8');
      socket.on('data', (data: Buffer) => {
        let str = data.toString();
        this.handlerServerData(this.parse(str), socket);
      });
      socket.on('close', () => {});
    });
    server.listen(this.address.port, this.address.host, () => {
      this.servers.forEach(addr => this.initClient(addr));
    });
  }

  initClient(address: MultiaddrResult) {
    const server = net.createConnection(address.port, address.host);
    server.on('data', (data: Buffer) => {
      let str = data.toString();
      this.handlerClientData(this.parse(str), server);
    });
    server.on('connect', () => {
      this.send(server, 'connect', { address: address.address });
    });
    return server;
  }

  handlerClientData(data: ImsP2pEvent, socket: net.Socket) {
    switch (data.type) {
      case 'ping':
        break;
      default:
        console.log(data);
    }
  }

  handlerServerData(
    data: ImsP2pEvent<{ address: string }>,
    socket: net.Socket,
  ) {
    switch (data.type) {
      case 'connect':
        this.clients.set(data.payload.address, socket);
        break;
      case 'ping':
        break;
      default:
        console.log(data);
    }
    console.log(data);
  }
}

export interface ImsP2pEvent<T = any> {
  type: string;
  payload: T;
}

// 主网
new ImsP2p('/ip4/127.0.0.1/tcp/3000', []);
// 节点1
new ImsP2p('/ip4/127.0.0.1/tcp/3001', ['/ip4/127.0.0.1/tcp/3000']);
new ImsP2p('/ip4/127.0.0.1/tcp/3002', [
  '/ip4/127.0.0.1/tcp/3000',
  '/ip4/127.0.0.1/tcp/3001',
]);
