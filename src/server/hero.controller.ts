import { Get, OnModuleInit, Controller } from '@nestjs/common';
import { Client, GrpcMethod, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HeroById } from '../interfaces/hero-by-id.interface';
import { Hero } from '../interfaces/hero.interface';
import { HeroService } from '../interfaces/hero.service';

@Controller()
export class HeroController implements OnModuleInit {
  onModuleInit() {}

  @GrpcMethod('HeroService')
  findOne(data: HeroById): Hero {
    const items: Hero[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
    return items.find(({ id }) => id === data.id);
  }
}
