import {
  Visitor,
  MetadataDef,
  injector as decoratorInjector,
  isClassMetadata,
  isPropertyMetadata,
  isMethodMetadata,
} from 'ims-decorator';
import {
  GetOptions,
  HeadOptions,
  DeleteOptions,
  OptionsOptions,
  PutOptions,
  PostOptions,
  HttpOptions,
  GetMetadataKey,
} from './decorator';
import multiaddr = require('multiaddr');
import http = require('http');
import { Type } from 'ims-core';
export interface MultiaddrResult {
  host: string;
  port: number;
  transport: multiaddr.MultiaddrProto;
  family: multiaddr.MultiaddrProto;
}
export class ImsHttpVisitor extends Visitor {
  visitHttp(meta: MetadataDef<HttpOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
    let that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = function(type: Type<any>) {
        return class extends type {
          constructor(...args: any[]) {
            super(...args);
            let server = http.createServer((req, res) => {
              const method = req.method.toLowerCase();
              debugger;
              switch (method) {
                case 'get':
                  that.visitTypeMetadataKey(
                    meta.target,
                    { req, res },
                    this,
                    GetMetadataKey,
                  );
                  break;
                default:
                  res.end(method);
                  break;
              }
            });
            server.listen(options.port, options.host);
          }
        };
      };
    }
    if (isPropertyMetadata(meta)) {
      context[meta.propertyKey] = parent;
    }
    return meta;
  }
  visitGet(
    meta: MetadataDef<GetOptions>,
    parent: { req: http.IncomingMessage; res: http.ServerResponse },
    context: any,
  ) {
    const options = meta.metadataDef;
    if (isMethodMetadata(meta)) {
      meta.methodRuntime = 'after';
      meta.metadataFactory = function(result) {
        parent.res.end(result);
      };
    }
    return meta;
  }
  visitPost(meta: MetadataDef<PostOptions>, parent: any, context: any) {}
  visitPut(meta: MetadataDef<PutOptions>, parent: any, context: any) {}
  visitOptions(meta: MetadataDef<OptionsOptions>, parent: any, context: any) {}
  visitDelete(meta: MetadataDef<DeleteOptions>, parent: any, context: any) {}
  visitHead(meta: MetadataDef<HeadOptions>, parent: any, context: any) {}

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

export const injector = decoratorInjector(new ImsHttpVisitor());
