import { grpcClientOptions } from './grpc-client.options';
export function imsMicro(app: any) {
  app.connectMicroservice(grpcClientOptions);
  return app;
}
