import {
  Visitor,
  MetadataDef,
  injector as decoratorInjector,
  isClassMetadata,
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
} from './decorator';
import multiaddr = require('multiaddr');
import http = require('http');
import { Type } from 'ims-core';
import { Observable, Subject } from 'rxjs';
export interface MultiaddrResult {
  host: string;
  port: number;
  transport: multiaddr.MultiaddrProto;
  family: multiaddr.MultiaddrProto;
}
export class ImsHttpVisitor extends Visitor {
  req: http.IncomingMessage;
  res: http.ServerResponse;
  msg: Subject<any> = new Subject();
  visitHttp(meta: MetadataDef<HttpOptions>, type: Type<any>) {
    let options = meta.metadataDef;
    let that = this;
    if (isClassMetadata(meta)) {
      this.addObservable(
        new Observable(obs => {
          let server = http.createServer((req, res) => {
            that.req = req;
            that.res = res;
            let method = this.req.method.toLowerCase();
            let url = this.req.url;
            this.msg.next({ method, url });
          });
          server.listen(options.port, options.host, () => {
            obs.next();
            obs.complete();
          });
        }),
      );
    }
    return meta;
  }
  visitGet(meta: MetadataDef<GetOptions>, type: Type<any>) {
    const options = meta.metadataDef;
    const { target } = meta;
    let that = this;
    this.msg.subscribe(res => {
      if (res.method === 'get') {
        if (res.url === options.path) {
          this.res.end(JSON.stringify(res));
        }
      }
    });
    if (isMethodMetadata(meta)) {
      let oldOnGet = target.prototype.onGet;
      target.prototype.onGet = function(p: PropertyKey, receiver: any) {
        console.log(p);
        console.log(meta.propertyKey);
        if (p === meta.propertyKey) {
          console.log(p);
        }
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
