import { createClient } from 'redis';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
let client = createClient();
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
        debugger;
        if (err) obs.error(err);
        obs.next(value);
        obs.complete();
      });
    });
  }

  static get(key: string): Observable<string> {
    return new Observable(obs => {
      client.get(key, (err, reply) => {
        if (err) obs.error(err);
        obs.next(reply);
        obs.complete();
      });
    });
  }

  static del(key: string): Observable<any> {
    return new Observable(obs => {
      client.del(key, (err, reply) => {
        if (err) obs.error(err);
        obs.next(reply);
        obs.complete();
      });
    });
  }

  static keys(pattern: string): Observable<string[]> {
    return new Observable(obs => {
      client.keys(pattern, (err, reply) => {
        if (err) obs.error(err);
        obs.next(reply);
        obs.complete();
      });
    });
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
}
