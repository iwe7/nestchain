import { createClient } from 'redis';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

let client = createClient();
client.unref();
export enum ImsCacheModel {
  // seconds
  EX = 'EX',
  // milliseconds
  PX = 'PX',
  // if it does not already exist
  NX = 'NX',
  //  if it already exist
  XX = 'XX',
}
export class ImsCache {
  static set(
    key: string,
    value: string,
    model: ImsCacheModel,
    duration: number,
  ): Observable<string> {
    return new Observable(obs => {
      client.set(key, value, model, duration, (err, res) => {
        if (err) obs.error(err);
        obs.next(value);
        obs.complete();
      });
    });
  }

  static get(key: string): Observable<string> {
    return this.toObservable<string>(client.get.bind(client), key);
  }

  static del(key: string): Observable<any> {
    return this.toObservable<any>(client.del.bind(client), key);
  }

  static keys(pattern: string): Observable<string[]> {
    return this.toObservable<string[]>(client.keys.bind(client), pattern);
  }

  static clean(): Observable<boolean> {
    return this.keys('*').pipe(
      switchMap(keys => {
        if (keys.length > 0) {
          return forkJoin(keys.map(key => this.del(key))).pipe(map(() => true));
        } else {
          of(true);
        }
      }),
    );
  }

  static toObservable<T>(fn: any, ...args: any[]): Observable<T> {
    return new Observable(obs => {
      fn(...args, (err: any, ...res: any[]) => {
        if (err) obs.error();
        if (res.length === 1) {
          obs.next(res[0]);
          obs.complete();
        } else {
          obs.next(res as any);
          obs.complete();
        }
      });
    });
  }
}
