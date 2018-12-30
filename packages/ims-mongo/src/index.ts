import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { Log } from './log.entity';
import { MONGO_CONFIG } from 'ims-const';
import { from, Observable } from 'rxjs';
import { P2pServerEntity } from './entity';
import { map } from 'rxjs/operators';
import { Type } from 'ims-core';
const options: ConnectionOptions = {
  ...MONGO_CONFIG,
  entities: [Log, P2pServerEntity],
};
export * from './entity';
export const connection = from(createConnection(options)).pipe(
  map(connect => {
    return new ImsMongoConnection(connect);
  }),
);
export class ImsMongoConnection {
  constructor(public connection: Connection) {}

  getAll<T>(type: Type<T>): Observable<T[]> {
    return from(this.connection.getRepository(type).find());
  }

  save<T = any>(type: Type<T>, instane: any): Observable<T> {
    return from(this.connection.getRepository(type).save(instane));
  }
}
// createConnection(options).then(async connection => {
//   const log = new Log();
//   /**
//    * save
//    */
//   await connection.getRepository(Log).save(log);
//   /**
//    * findOne
//    */
//   const loadedPost = await connection.getRepository(Log).findOne({
//     ip: 'Hello how are you?',
//   });
//   /**
//    * find
//    */
//   const allPosts = await connection.getRepository(Log).find();
//   /**
//    * createEntityCursor
//    */
//   const cursor1 = connection
//     .getMongoRepository(Log)
//     .createEntityCursor({ ip: 'hello' });

//   const cursor2 = connection.mongoManager.createEntityCursor(Log, {
//     ip: 'hello',
//   });

//   console.log('run');

//   connection.close();
//   connection = null;
// });
