import { NestFactory } from '@nestjs/core';
import { HeroModule } from './hero.module';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

NestFactory.create(HeroModule).then(async app => {
  // app.connectMicroservice();
  await app.startAllMicroservicesAsync();
  await app.listen(82, '0.0.0.0');
});
