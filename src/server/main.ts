import { NestFactory } from '@nestjs/core';
import { HeroModule } from './hero.module';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {grpcClientOptions} from '../grpc-client.options';
NestFactory.create(HeroModule).then(async app => {
  // app.connectMicroservice();
  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(81, '0.0.0.0');
});
