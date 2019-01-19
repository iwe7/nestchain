import { Injectable, getCurrentInjector, injectorEvent } from 'ims-core';
import BlockService = require('ipfs-block-service');
import { filter, take, map } from 'ims-rxjs/operators';
import { IpfsRepo } from '../token';
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return injectorEvent
      .pipe(
        filter(it => it === IpfsRepo),
        take(1),
        map(() => {
          let injector = getCurrentInjector();
          let repo = injector.get(IpfsRepo);
          return new BlockService(repo);
        }),
      )
      .toPromise();
  },
  deps: [],
})
export abstract class IpfsBlockService {}
