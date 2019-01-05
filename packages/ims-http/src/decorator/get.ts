import { makeDecorator, TypeDecorator, MetadataDef } from 'ims-decorator';
import { Type } from 'ims-core';
import { NgInjectableDef } from 'ims-injector';
export const GetMetadataKey = 'GetMetadataKey';
export interface GetOptions {
  method: 'get';
  path: string;
}
export interface GetDecorator {
  (path?: string): TypeDecorator;
}
export const Get: GetDecorator = makeDecorator(
  GetMetadataKey,
  'visitGet',
  path => ({
    path: path || '',
    method: 'get',
  }),
  (type: Type<any>, opt: MetadataDef<any>) => {
    const options = opt.metadataDef;
    Object.defineProperty(type, 'ngInjectableDef', {
      get: () => new NgInjectableDef(type, options.providedIn),
    });
  },
);
