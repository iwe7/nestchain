import { TypeDecorator } from 'ims-decorator';
export declare const GrpcRouterMetadataKey = "GrpcRouterMetadataKey";
export interface GrpcRouterOptions {
    path: string;
}
export interface GrpcRouterDecorator {
    (path?: string): TypeDecorator;
}
export declare const GrpcRouter: GrpcRouterDecorator;
