import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { P2pModule } from './p2p.module';
import { join } from 'path';

export async function bootstrap() {
  let app = await NestFactory.create(P2pModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0' + ':50051',
      package: 'ims-p2p',
      protoPath: join(__dirname, 'ims-p2p.proto'),
      loader: {
        arrays: true,
      },
    },
  });
  app.listen(80);
}

bootstrap();
