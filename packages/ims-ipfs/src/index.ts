import {
  IpfsFactory,
  StaticProvider,
  Injector,
  Ipfs,
  IpfsOptions,
} from 'ims-core';
import IPFS = require('ipfs');
export class IpfsFactoryImpl extends IpfsFactory {
  create(options?: IpfsOptions): Ipfs {
    return new IPFS(options);
  }
}
export const imsIpfsProviders: StaticProvider[] = [
  {
    provide: IpfsFactory,
    useFactory: (injector: Injector) => {
      return new IpfsFactoryImpl();
    },
    deps: [Injector],
  },
];
