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
import { connection, P2pServerEntity } from 'ims-mongo';
import { SendOptions } from './decorator/send';
import { map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { createTcpServer, createTcpClient } from './tcp';

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
            connection
              .pipe(
                switchMap(connect => {
                  let inst = new P2pServerEntity();
                  inst.address = options.address;
                  let repository = connect.getRepository(P2pServerEntity);
                  return from(repository.findOne(inst)).pipe(
                    switchMap(item => {
                      if (!!item) {
                        return from(
                          repository.update({ address: item.address }, inst),
                        );
                      } else {
                        return from(repository.save(inst));
                      }
                      return of(null);
                    }),
                  );
                }),
              )
              .subscribe(() => {
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
                    let udp = dgram.createSocket('udp4');
                    that.visitTypeOther(meta.target, udp, this);
                    for (let i in options.router) {
                      let router = options.router[i];
                      that.visitType(router, udp, true);
                    }
                    break;
                  default:
                    console.log(addr);
                }
              });
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
  async visitClient(
    meta: MetadataDef<ClientOptions>,
    parent: any,
    context: any,
  ) {
    const options = meta.metadataDef;
    // 从数据库查找地址库
    const address = await connection
      .pipe(
        switchMap(connect => {
          let repository = connect.getRepository(P2pServerEntity);
          return repository.find();
        }),
      )
      .toPromise();
    let addrs = address.map(item => this.toMulitaddr(item.address));
    const that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {
          constructor(...args: any[]) {
            super(...args);
            addrs.map(addr => {
              switch (addr.transport.name) {
                case 'tcp':
                  let tcp = createTcpClient(addr);
                  that.visitTypeOther(meta.target, tcp, this);
                  for (let i in options.router) {
                    let router = options.router[i];
                    that.visitType(router, tcp, false);
                  }
                  return tcp;
                case 'udp':
                  let udp = dgram.createSocket('udp4');
                  that.visitTypeOther(meta.target, udp, this);
                  for (let i in options.router) {
                    let router = options.router[i];
                    that.visitType(router, udp, true);
                  }
                  return udp;
                default:
                  console.log(addr);
              }
            });
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
