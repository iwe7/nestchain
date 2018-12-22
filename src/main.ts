import { NestFactory } from '@nestjs/core';
import { ImsChain } from 'ims-chain';
NestFactory.create(ImsChain).then(async app => {
  // app.connectMicroservice();
  await app.startAllMicroservicesAsync();
  await app.listen(80, '0.0.0.0');
});
