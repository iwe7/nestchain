import { makeDecorator, TypeDecorator, isClassMetadata } from 'ims-decorator';
import { Type, IInjector } from 'ims-core';
import { Options } from '@grpc/proto-loader';

export const GrpcServerMetadataKey = 'GrpcServerMetadataKey';
let port = 5000;
export interface LoadOptions {
  convertFieldsToCamelCase?: boolean;
  binaryAsBase64?: boolean;
  longsAsStrings?: boolean;
  deprecatedArgumentOrder?: boolean;
}
export interface GrpcServerOptions {
  fileName: string;
  format?: 'proto' | 'json';
  options?: Options;
  router?: IInjector;
  address?: string;
}
export interface GrpcServerDecorator {
  (opt: GrpcServerOptions): TypeDecorator;
}
export const GrpcServer: GrpcServerDecorator = makeDecorator(
  GrpcServerMetadataKey,
  'visitGrpcServer',
  dir => dir,
  (type, meta) => {
    if (isClassMetadata(meta)) {
      meta.metadataDef.options = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
        ...meta.metadataDef.options,
      };
      meta.metadataDef.address =
        meta.metadataDef.address || `0.0.0.0:${++port}`;
    }
  },
);
