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
} from 'ims-http';
import { Type } from 'ims-core';
export class ImsP2pServerVisitor extends Visitor {
  routes: Map<Type<any>, Set<any>> = new Map();
  visitHttp(meta: MetadataDef<HttpOptions>, type: Type<any>) {
    let options = meta.metadataDef;
    let that = this;
    if (isClassMetadata(meta)) {
      meta.metadataFactory = (type: Type<any>) => {
        let routes = [];
        that.routes.get(meta.target).forEach(route => {
          routes.push(route);
        });
        debugger;
        type.prototype.routes = {
          prefix: options.path,
          list: routes,
        };
        return type;
      };
    }
    return meta;
  }
  visitGet(meta: MetadataDef<GetOptions>, type: Type<any>) {
    let options = meta.metadataDef;
    if (isMethodMetadata(meta)) {
      if (!this.routes.has(type)) {
        this.routes.set(type, new Set());
      }
      let routes = this.routes.get(type);
      routes.add({
        path: options.path,
        method: 'get',
        action: type.prototype[meta.propertyKey],
      });
      this.routes.set(type, routes);
    }
    return meta;
  }
  visitPost(meta: MetadataDef<PostOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
  }
  visitPut(meta: MetadataDef<PutOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
  }
  visitOptions(meta: MetadataDef<OptionsOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
  }
  visitDelete(meta: MetadataDef<DeleteOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
  }
  visitHead(meta: MetadataDef<HeadOptions>, parent: any, context: any) {
    let options = meta.metadataDef;
  }
}

export const injector = decoratorInjector(new ImsP2pServerVisitor());
