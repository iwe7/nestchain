import { TypeDecorator } from 'ims-decorator';
import { IInjector } from 'ims-core';
import { Options } from '@grpc/proto-loader';
export declare const GrpcServerMetadataKey = "GrpcServerMetadataKey";
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
export declare const GrpcServer: GrpcServerDecorator;
