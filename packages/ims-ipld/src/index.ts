import {
  Injectable,
  corePlatform,
  getCurrentInjector,
  CoreModule,
} from 'ims-core';
import _Ipld = require('ipld');
export * from './dag-pb';
import { IpfsBlockService, ImsIpfs } from 'ims-ipfs';

@Injectable({
  providedIn: 'root',
  useFactory: async () => {
    let injector = getCurrentInjector();
    await injector.get(ImsIpfs);
    const blockService = await injector.get(IpfsBlockService);
    return new _Ipld({
      blockService,
    });
  },
  deps: [],
})
export class Ipld {}

corePlatform()
  .then(res => res.bootstrapModule(CoreModule))
  .then(async res => {
    let ipld = await res.injector.get(Ipld);
    debugger;
  });
