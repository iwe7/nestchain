import { Visitor, MetadataDef } from 'ims-decorator';
import { GrpcServerOptions, GrpcRouterOptions, GrpcClientOptions } from './decorator';
export declare class GrpcVisitor extends Visitor {
    visitGrpcServer(it: MetadataDef<GrpcServerOptions>, parent: any, context: any, opts?: any): MetadataDef<GrpcServerOptions>;
    visitGrpcClient(it: MetadataDef<GrpcClientOptions>, parent: any, context: any, opts?: any): MetadataDef<GrpcClientOptions>;
    visitGrpcRouter(it: MetadataDef<GrpcRouterOptions>, parent: any, context: any, opts?: any): import("../../ims-decorator/src/metadata").ClassMetadata<GrpcRouterOptions>;
}
