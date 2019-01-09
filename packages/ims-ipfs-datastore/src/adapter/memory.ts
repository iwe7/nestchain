import {
  Datastore,
  Key,
  Query,
  QueryResult,
  Injector,
  KeyFactory,
} from 'ims-core';
import { of } from 'ims-rxjs';
export class MemoryDatastore<T extends Buffer> extends Datastore<T> {
  data: Map<string, T> = new Map();
  keyFactory: KeyFactory;
  constructor(public injector: Injector) {
    super();
    this.keyFactory = this.injector.get(KeyFactory);
  }
  open() {
    return of(void 0).toPromise();
  }
  close() {
    return of(void 0).toPromise();
  }
  put(key: Key, val: T) {
    this.data.set(key.toString(), val);
    return of(void 0).toPromise();
  }
  async get(key: Key) {
    let isHas = await this.has(key);
    if (isHas) {
      return of(this.data.get(key.toString())).toPromise();
    }
  }
  has(key: Key) {
    return of(this.data.has(key.toString())).toPromise();
  }

  delete(key: Key) {
    this.data.delete(key.toString());
    return of(void 0).toPromise();
  }

  batch() {
    let puts = [];
    let dels = [];
    return {
      put(key: Key, value: Buffer): void {
        puts.push([key, value]);
      },
      delete(key: Key): void {
        dels.push(key);
      },
      commit: (): Promise<void> => {
        puts.forEach(v => {
          this.data[v[0].toString()] = v[1];
        });
        puts = [];
        dels.forEach(key => {
          delete this.data[key.toString()];
        });
        dels = [];
        return of(void 0).toPromise();
      },
    };
  }
  query(q: Query<T>): QueryResult<T> {
    return undefined;
  }
}
