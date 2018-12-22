import {
  makeDecorator,
  TypeDecorator,
  MetadataDef,
  isMethodMetadata,
  isClassMetadata,
} from 'ims-decorator';
import { Type } from 'ims-core';
import { titleCase } from 'ims-util';

export const GrpcRouterMetadataKey = 'GrpcRouterMetadataKey';
export interface GrpcRouterOptions {
  path: string;
}
export interface GrpcRouterDecorator {
  (path?: string): TypeDecorator;
}
export const GrpcRouter: GrpcRouterDecorator = makeDecorator(
  GrpcRouterMetadataKey,
  'visitGrpcRouter',
  path => ({ path }),
  (type: Type<any>, meta: MetadataDef<GrpcRouterOptions>) => {
    if (isMethodMetadata(meta)) {
      meta.metadataDef.path =
        meta.metadataDef.path || titleCase(meta.propertyKey as string);
    }
    if (isClassMetadata(meta)) {
      meta.metadataDef.path = meta.metadataDef.path || titleCase(type.name);
    }
    return meta;
  },
);
