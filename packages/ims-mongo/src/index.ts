import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { Log } from './log.entity';
import { MONGO_CONFIG } from 'ims-const';
import { from, Observable, of, forkJoin } from 'rxjs';
import { P2pServerEntity } from './entity';
import { map, switchMap } from 'rxjs/operators';
import { Type } from 'ims-core';
const options: ConnectionOptions = {
  ...MONGO_CONFIG,
  entities: [Log, P2pServerEntity],
};

export * from './entity';

export const connection = from(createConnection(options));
