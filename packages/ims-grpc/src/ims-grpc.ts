export {
  GrpcClient as Client,
  GrpcServer as Server,
  GrpcRouter as Router,
} from './decorator';
export * from './grpc.visitor';
import { GrpcVisitor } from './grpc.visitor';
import { injector as inject } from 'ims-decorator';
export const injector = inject(new GrpcVisitor());
