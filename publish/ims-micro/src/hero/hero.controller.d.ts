import { OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';
export declare class HeroController implements OnModuleInit {
    private readonly client;
    private heroService;
    onModuleInit(): void;
    call(): Observable<any>;
    findOne(data: HeroById): Hero;
}
