import { ClientOptions, Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: join(__dirname, './hero.proto'),
  },
};

export function generateGrpcOptions(
  url: string,
  packageName: string,
  protoFileName: string,
): GrpcOptions {
  return {
    transport: Transport.GRPC,
    options: {
      url,
      package: packageName,
      protoPath: join(__dirname, 'protobufs/' + protoFileName),
      loader: {
        arrays: true,
      },
    },
  };
}
