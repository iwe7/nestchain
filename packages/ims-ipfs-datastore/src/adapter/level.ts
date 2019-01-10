import {
  Datastore,
  Injector,
  KeyFactory,
  Key,
  QueryResult,
  QueryEntry,
  Query,
} from 'ims-core';
import levelup, { LevelUp } from 'levelup';
import leveldown = require('leveldown');
import encode = require('encoding-down');
import pull = require('pull-stream');
export interface LevelOptions {
  createIfMissing?: boolean;
  errorIfExists?: boolean;
  compression?: boolean;
  cacheSize?: number;
  db?: Object;
}
export class LevelDatastore<T extends Buffer> extends Datastore<T> {
  keyFactory: KeyFactory;
  db: LevelUp;
  constructor(public injector: Injector, path: string, opts: LevelOptions) {
    super();
    this.keyFactory = this.injector.get(KeyFactory);
    let database: any = leveldown;
    if (opts && opts.db) {
      database = opts.db;
      delete opts.db;
    }

    this.db = levelup(
      encode(database(path), { valueEncoding: 'binary' }),
      Object.assign({}, opts, {
        compression: false, // same default as go
      }),
      err => {
        // Prevent an uncaught exception error on duplicate locks
        if (err) {
          throw err;
        }
      },
    );
  }
  open() {
    return this.db.open();
  }

  close() {
    return this.db.close();
  }

  put(key: Key, value: T) {
    return this.db.put(key.toString(), value);
  }
  get(key: Key) {
    return this.db.get(key.toString());
  }
  has(key: Key) {
    return this.db.get(key.toString());
  }
  delete(key: Key) {
    return this.db.del(key.toString());
  }
  batch() {
    const ops = [];
    return {
      put: (key: Key, value: Buffer): void => {
        ops.push({
          type: 'put',
          key: key.toString(),
          value: value,
        });
      },
      delete: (key: Key): void => {
        ops.push({
          type: 'del',
          key: key.toString(),
        });
      },
      commit: (): Promise<any> => {
        return this.db.batch(ops);
      },
    };
  }
  query(q: Query<T>): QueryResult<T> {
    return undefined;
  }
}
