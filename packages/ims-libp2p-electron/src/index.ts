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
          info.multiaddrs.add('/ip4/0.0.0.0/tcp/0');
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

          let cfg: tokens.Libp2pConfig = {
            peerInfo: await peerInfoFactory(),
            modules: {
              transport: [tcp, ws],
              streamMuxer: [mplex, spdy],
              connEncryption: [secio],
              peerDiscovery: [mdns, bootstrap],
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
                  list: [
                    '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                    '/ip4/104.236.176.52/tcp/4001/ipfs/QmSoLnSGccFuZQJzRadHn95W2CrSFmZuTdDWP8HXaHca9z',
                    '/ip4/104.236.179.241/tcp/4001/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
                    '/ip4/162.243.248.213/tcp/4001/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
                    '/ip4/128.199.219.111/tcp/4001/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
                    '/ip4/104.236.76.40/tcp/4001/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
                    '/ip4/178.62.158.247/tcp/4001/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
                    '/ip4/178.62.61.185/tcp/4001/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
                    '/ip4/104.236.151.122/tcp/4001/ipfs/QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx',
                  ],
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
