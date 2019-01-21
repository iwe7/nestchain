import * as tokens from 'ims-ipfs';
import { Injector } from 'ims-core';
import { merge } from 'ims-util';

export class IpfsFactory implements tokens.IpfsFactory {
  injector: Injector;
  constructor(injector: Injector) {
    this.injector = injector;
  }
  async create(): Promise<tokens.Ipfs> {
    let Ipfs = await this.injector.get(tokens.Ipfs);
    let options = await this.injector.get(tokens.Options);
    return new Ipfs(merge(...options));
  }
}
