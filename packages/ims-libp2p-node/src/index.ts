import * as tokens from 'ims-libp2p';
import { Provider, Injector, NgModule, bootstrapModule } from 'ims-core';
import { ImsPromise } from 'ims-util';
import libs from './lib';
import inits from './init';

export const libp2pNodeProviders: Provider[] = [
  ...libs,
  ...inits,
  {
    provide: tokens.PeerInfoFactory,
    useFactory: () => {
      return () => {
        let imsPromise = new ImsPromise();
        let peerInfo = require('peer-info');
        peerInfo.create((err, info) => {
          if (err) return imsPromise.error(err);
          info.multiaddrs.add('/ip4/0.0.0.0/tcp/4002');
          info.multiaddrs.add('/ip4/127.0.0.1/tcp/4003/ws');
          imsPromise.next(info);
        });
        return imsPromise.promise;
      };
    },
    deps: [],
  },
  {
    provide: tokens.Libp2pConfigFactory,
    useFactory: (injector: Injector) => {
      return async () => {
        if (injector) {
          let peerInfoFactory = await injector.get(tokens.PeerInfoFactory);
          let dht = await injector.get(tokens.Libp2pKadDht);
          /**
           * 传输协议
           */
          let tcp = await injector.get(tokens.Libp2pTcp);
          let ws = await injector.get(tokens.Libp2pWebsockets);

          let mplex = await injector.get(tokens.Libp2pMplex);
          let spdy = await injector.get(tokens.Libp2pSpdy);
          /**
           * 数据加密
           */
          let secio = await injector.get(tokens.Libp2pSecio);
          /**
           * 网络发现
           */
          let mdns = await injector.get(tokens.Libp2pMdns);
          let bootstrap = await injector.get(tokens.Libp2pBootstrap);

          let peerInfo = await peerInfoFactory();
          let Libp2pWebrtcStar = await injector.get(tokens.Libp2pWebrtcStar);
          let Libp2pWebsocketStar = await injector.get(
            tokens.Libp2pWebsocketStar,
          );
          const wrtcStar = new Libp2pWebrtcStar({
            wrtc: require('wrtc'),
            id: peerInfo.id,
          });
          const wsstar = new Libp2pWebsocketStar({ id: peerInfo.id });

          let cfg: tokens.Libp2pConfig = {
            peerInfo: peerInfo,
            modules: {
              transport: [tcp, ws, wrtcStar, wsstar],
              streamMuxer: [mplex, spdy],
              connEncryption: [secio],
              peerDiscovery: [
                wrtcStar.discovery,
                wsstar.discovery,
                mdns,
                bootstrap,
              ],
              dht: dht,
            },
            config: {
              peerDiscovery: {
                mdns: {
                  interval: 2000,
                  enabled: true,
                },
                bootstrap: {
                  interval: 2000,
                  enabled: true,
                  list: [],
                },
              },
              dht: {
                kBucketSize: 20,
              },
              relay: {
                enabled: true,
                hop: {
                  enabled: false,
                },
              },
              EXPERIMENTAL: {
                pubsub: true,
                dht: false,
              },
            },
          };
          return cfg;
        }
      };
    },
    deps: [Injector],
  },
  {
    provide: tokens.Libp2pFactory,
    useFactory: (injector: Injector) => {
      if (injector) {
        return async (config: tokens.Libp2pConfig) => {
          let configFactory = await injector.get(tokens.Libp2pConfigFactory);
          let libp2pConfig = await configFactory(config);
          let libp2p = await injector.get(tokens.Libp2p);
          return new libp2p(libp2pConfig);
        };
      }
    },
    deps: [Injector],
  },
];

@NgModule({
  providers: libp2pNodeProviders,
})
export class ImsLibp2pNodeModule {}

bootstrapModule(ImsLibp2pNodeModule);
