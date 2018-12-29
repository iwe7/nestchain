import {
  Visitor,
  MetadataDef,
  injector as decoratorInjector,
  isClassMetadata,
  isPropertyMetadata,
  isMethodMetadata,
} from 'ims-decorator';
import { Type } from 'ims-core';
import {
  ServerOptions,
  ClientOptions,
  RouterOptions,
  OnOptions,
} from './decorator';
import multiaddr = require('multiaddr');
import net = require('net');
import dgram = require('dgram');
import http = require('http');
import axios from 'axios';

import { SendOptions } from './decorator/send';
function createTcpServer(
  options: MultiaddrResult,
  onCreateServer: (socket: net.Socket) => any,
) {
  let server = net.createServer(socket => {
    socket.setEncoding('utf8');
    onCreateServer(socket);
  });
  server.listen(options.port, options.host);
  return server;
}

function createTcpClient(options: MultiaddrResult) {
  return net.createConnection({
    port: options.port,
    host: options.host,
    family: options.family.code,
  });
}
export class ImsProtocolVisitor extends Visitor {
  visitServer(meta: MetadataDef<ServerOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    const addr = this.toMulitaddr(options.address);
    const that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {
          constructor(...args: any[]) {
            super(...args);
            switch (addr.transport.name) {
              case 'tcp':
                let tcp = createTcpServer(addr, socket => {
                  for (let i in options.router) {
                    let router = options.router[i];
                    that.visitType(router, socket, true);
                  }
                });
                that.visitTypeOther(meta.target, tcp, this);
                break;
              case 'udp':
                let udp = dgram.createSocket;
                that.visitTypeOther(meta.target, udp, this);
                for (let i in options.router) {
                  let router = options.router[i];
                  that.visitType(router, udp, true);
                }
                break;
              default:
                console.log(addr);
            }
          }
        };
      };
    }
    if (isPropertyMetadata(meta)) {
      Object.defineProperty(context, meta.propertyKey, {
        value: parent,
        writable: true,
      });
    }
    return meta;
  }
  visitClient(meta: MetadataDef<ClientOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    const addr = this.toMulitaddr(options.address);
    const that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {
          constructor(...args: any[]) {
            super(...args);
            switch (addr.transport.name) {
              case 'tcp':
                let server = createTcpClient(addr);
                that.visitTypeOther(meta.target, server, this);
                for (let i in options.router) {
                  let router = options.router[i];
                  that.visitType(router, server, false);
                }
                break;
              case 'udp':
                let udp = dgram.createSocket;
                that.visitTypeOther(meta.target, udp, this);
                for (let i in options.router) {
                  let router = options.router[i];
                  that.visitType(router, udp, true);
                }
                break;
              case 'http':
                let _http = http.createServer(
                  (req, res: http.ServerResponse) => {
                    for (let i in options.router) {
                      let router = options.router[i];
                      that.visitType(router, udp, true);
                    }
                  },
                );
                that.visitTypeOther(meta.target, _http, this);
                _http.listen(addr.port, addr.host);
                break;
              default:
                console.log(addr);
            }
          }
        };
      };
    }
    if (isPropertyMetadata(meta)) {
      Object.defineProperty(context, meta.propertyKey, {
        value: parent,
        writable: true,
      });
    }
    return meta;
  }

  /**
   *
   * @param meta 配置
   * @param parent server or client instance
   * @param context this
   */
  visitRouter(
    meta: MetadataDef<RouterOptions>,
    parent: net.Server | net.Socket,
    isServer: boolean,
  ) {
    const that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {
          constructor(...args: any[]) {
            super(...args);
            that.visitTypeOther(meta.target, parent, this);
          }
        };
      };
    }
    return meta;
  }

  visitOn(meta: MetadataDef<OnOptions>, parent: any, context: any) {
    const options = meta.metadataDef;
    if (isMethodMetadata(meta)) {
      parent.on(options.type, context[meta.propertyKey].bind(context));
    }
    return meta;
  }

  visitSend(meta: MetadataDef<SendOptions>, parent: net.Socket, context: any) {
    const options = meta.metadataDef;
    if (isMethodMetadata(meta)) {
      const old = context[meta.propertyKey].bind(context);
      context[meta.propertyKey] = function(...args: any[]) {
        let result = old(...args);
        parent.emit(meta.propertyKey, result);
      };
    }
  }

  toMulitaddr(address: string): MultiaddrResult {
    const addr = multiaddr(address);
    const protos = addr.protos();
    const opt = addr.toOptions();
    let result = {
      host: opt.host,
      port: opt.port,
      transport: protos[1],
      family: protos[0],
    };
    return result;
  }
}

export interface MultiaddrResult {
  host: string;
  port: number;
  transport: multiaddr.MultiaddrProto;
  family: multiaddr.MultiaddrProto;
}

export const injector = decoratorInjector(new ImsProtocolVisitor());
