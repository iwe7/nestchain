import { Controller, Get } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';
import { grpcClientOptions } from '../grpc-client.options';
import { HeroService } from '../interfaces/hero.service';
@Controller()
export class HeroController {
  @Client({
    ...grpcClientOptions,
  })
  client: ClientGrpc;
  heroService: HeroService;
  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  @Get()
  index() {
    return this.heroService.findOne({ id: 1 });
  }
}
