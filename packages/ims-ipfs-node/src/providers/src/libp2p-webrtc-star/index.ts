import { Provider, Injector } from 'ims-core';
import * as tokens from 'ims-ipfs';
import { Libp2pWebrtcStarFactory } from './factory';
export default [
  {
    provide: tokens.IpfsFactory,
    useFactory: (injector: Injector) => {
      return new Libp2pWebrtcStarFactory(injector);
    },
    deps: [Injector],
  },
] as Provider[];
