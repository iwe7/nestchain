import {
  Visitor,
  MetadataDef,
  injector as decoratorInjector,
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
import http = require('http');
import { Type } from 'ims-core';
import { Subject } from 'rxjs';
export class ImsHttpVisitor extends Visitor {
  req: http.IncomingMessage;
  res: http.ServerResponse;
  msg: Subject<any> = new Subject();
  visitHttp(meta: MetadataDef<HttpOptions>, type: Type<any>) {
    let options = meta.metadataDef;
    return meta;
  }
  visitGet(meta: MetadataDef<GetOptions>, type: Type<any>) {
    let options = meta.metadataDef;
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

export const injector = decoratorInjector(new ImsHttpVisitor());
