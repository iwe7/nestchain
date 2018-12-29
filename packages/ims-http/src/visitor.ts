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
import multiaddr = require('multiaddr');

export class ImsHttpVisitor extends Visitor {
  visitHttp(meta: MetadataDef<HttpOptions>, parent: any, context: any) {}
  visitGet(meta: MetadataDef<GetOptions>, parent: any, context: any) {}
  visitPost(meta: MetadataDef<PostOptions>, parent: any, context: any) {}
  visitPut(meta: MetadataDef<PutOptions>, parent: any, context: any) {}
  visitOptions(meta: MetadataDef<OptionsOptions>, parent: any, context: any) {}
  visitDelete(meta: MetadataDef<DeleteOptions>, parent: any, context: any) {}
  visitHead(meta: MetadataDef<HeadOptions>, parent: any, context: any) {}
}

export const injector = decoratorInjector(new ImsHttpVisitor());
