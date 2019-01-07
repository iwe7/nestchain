import { TypeDecorator } from 'ims-decorator';
export declare const GrpcClientMetadataKey = "GrpcClientMetadataKey";
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
export declare const GrpcClient: GrpcClientDecorator;
