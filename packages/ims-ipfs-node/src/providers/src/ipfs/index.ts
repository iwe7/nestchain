import { Provider, Injector } from 'ims-core';
import * as tokens from 'ims-ipfs';
import { IpfsFactory } from './factory';
export default [
  {
    provide: tokens.Ipfs,
    useValue: require('ipfs'),
  },
  {
    provide: tokens.Options,
    multi: true,
    useValue: {
      start: true,
      EXPERIMENTAL: {},
    },
  },
  {
    provide: tokens.IpfsFactory,
    useFactory: (injector: Injector) => {
      return new IpfsFactory(injector);
    },
    deps: [Injector],
  },
] as Provider[];
