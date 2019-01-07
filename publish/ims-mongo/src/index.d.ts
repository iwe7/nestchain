import { Connection } from 'typeorm';
import { Observable } from 'rxjs';
export * from './entity';
export declare const connection: Observable<Connection>;
