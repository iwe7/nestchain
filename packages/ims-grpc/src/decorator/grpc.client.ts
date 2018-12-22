import { makeDecorator, TypeDecorator, isClassMetadata } from 'ims-decorator';
export const GrpcClientMetadataKey = 'GrpcClientMetadataKey';
import { Options } from '@grpc/proto-loader';

export interface GrpcClientOptions {
  fileName?: string;
  options?: Options;
  address?: string;
  path?: string;
}

export interface GrpcClientDecorator {
  (opt: GrpcClientOptions): TypeDecorator;
}
export const GrpcClient: GrpcClientDecorator = makeDecorator(
  GrpcClientMetadataKey,
  'visitGrpcClient',
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
    }
  },
);
