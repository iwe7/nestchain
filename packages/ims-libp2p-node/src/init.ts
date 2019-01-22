import { Provider, AppInitialization, Injector } from 'ims-core';
import * as tokens from 'ims-libp2p';
export default [
  {
    provide: AppInitialization,
    useFactory: () => {
      async function startP2p(injector: Injector) {
        let libp2pFactory = await injector.get(tokens.Libp2pFactory);
        let node2 = await libp2pFactory();
        node2.start(err => {
          if (err) throw err;
          node2.peerInfo.multiaddrs.forEach(ma => console.log(ma.toString()));
        });
        node2.on('peer:discovery', peer => {
          console.log(node2.peerBook)
        });
        node2.on('peer:connect', peer => {});
      }
      startP2p.index = 100;
      return startP2p;
    },
    deps: [],
    multi: true,
  },
] as Provider[];
