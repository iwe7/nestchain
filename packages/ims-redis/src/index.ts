import { createClient } from 'redis';
import { NgModule } from 'ims-core';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
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
export class ImsRedis {
  constructor(public client: any) {}
  set(
    key: string,
    value: string,
    model: ImsCacheModel,
    duration: number,
  ): Observable<string> {
    return new Observable(obs => {
      this.client.set(key, value, model, duration, (err, res) => {
        if (err) obs.error(err);
        obs.next(value);
        obs.complete();
      });
    });
  }

  get(key: string): Observable<string> {
    return new Observable(obs => {
      this.client.get(key, (err, reply) => {
        if (err) obs.error(err);
        obs.next(reply);
        obs.complete();
      });
    });
  }

  del(key: string): Observable<any> {
    return new Observable(obs => {
      this.client.del(key, (err, reply) => {
        if (err) obs.error(err);
        obs.next(reply);
        obs.complete();
      });
    });
  }

  keys(pattern: string): Observable<string[]> {
    return new Observable(obs => {
      this.client.keys(pattern, (err, reply) => {
        if (err) obs.error(err);
        obs.next(reply);
        obs.complete();
      });
    });
  }

  clean(): Observable<boolean> {
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

@Injectable()
export class ImsRedisFactory {
  create(): ImsRedis {
    let client = createClient();
    return new ImsRedis(client);
  }
}

@NgModule({
  providers: [ImsRedisFactory],
})
export class ImsRedisModule {}
