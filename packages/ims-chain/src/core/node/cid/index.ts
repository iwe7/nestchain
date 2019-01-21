import { Provider, Injector } from 'ims-core';
import * as tokens from '../../tokens/index';
import { CIDFactory } from './factory';

export default [
  {
    provide: tokens.CID,
    useValue: require('cids'),
  },
  {
    provide: tokens.CIDFactory,
    useFactory: (injector: Injector) => {
      return new CIDFactory(injector);
    },
    deps: [Injector],
  },
] as Provider[];
