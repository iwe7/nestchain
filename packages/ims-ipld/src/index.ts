import {
  Injectable,
  corePlatform,
  getCurrentInjector,
  injectorEvent,
} from 'ims-core';
import _Ipld = require('ipld');
export * from './dag-pb';
import { IpfsBlockService, ImsIpfsModule } from 'ims-ipfs';
import { filter, take } from 'ims-rxjs/operators';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return injectorEvent
      .pipe(
        filter(it => it === IpfsBlockService),
        take(1),
      )
      .toPromise()
      .then(async () => {
        let injector = getCurrentInjector();
        const blockService = await injector.get(IpfsBlockService);
        return new _Ipld({
          blockService,
        });
      })
      .catch(e => {
        throw e;
      });
  },
  deps: [],
})
export class Ipld {}

corePlatform()
  .then(res => res.bootstrapModule(ImsIpfsModule))
  .then(async res => {
    let ipld = await res.injector.get(Ipld);
    debugger;
  });
