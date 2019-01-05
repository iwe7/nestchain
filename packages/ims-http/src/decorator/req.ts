import {
  makeDecorator,
  TypeDecorator,
  MetadataDef,
  isMethodMetadata,
  isParameterMetadata,
} from 'ims-decorator';
import { InjectionToken, inject, NgInjectableDef } from 'ims-injector';
export const ReqMetadataKey = 'ReqMetadataKey';
export interface ReqDecorator {
  (): TypeDecorator;
  new (): TypeDecorator;
  new (): Req;
  (): Req;
}
export interface Req {}
export const ReqToken = new InjectionToken('ReqToken');
export const Req: ReqDecorator = makeDecorator(
  ReqMetadataKey,
  ReqToken,
  dir => dir,
);
