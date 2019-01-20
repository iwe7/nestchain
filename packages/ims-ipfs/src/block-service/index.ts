import { Injectable, getCurrentInjector, injectorEvent } from 'ims-core';
import BlockService = require('ipfs-block-service');
import { IpfsRepo } from '../token';
@Injectable({
  providedIn: 'root',
  useFactory: async () => {
    let injector = getCurrentInjector();
    let repo = await injector.get(IpfsRepo);
    return new BlockService(repo);
  },
  deps: [],
})
export abstract class IpfsBlockService {}
