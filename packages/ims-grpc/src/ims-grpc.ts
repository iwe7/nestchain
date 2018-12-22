export * from './decorator';
export * from './grpc.visitor';
import { GrpcVisitor } from './grpc.visitor';
import { injector as inject } from 'ims-decorator';
export const injector = inject(new GrpcVisitor());
