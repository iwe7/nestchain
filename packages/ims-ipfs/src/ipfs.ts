import {
  Injector,
  Injectable,
  InjectionToken,
  getCurrentInjector,
} from 'ims-core';
import IPFS = require('ipfs');
import * as tokens from './token';
const defaultsDeep = require('@nodeutils/defaults-deep');
export const IpfsConfig = new InjectionToken('IpfsConfig');
let defaultIpfsConfig = {
  repo: '.ipfs'
};
@Injectable({
  providedIn: 'root',
  useFactory: async () => {
    return new Promise(async (resolve, reject) => {
      let config = await getCurrentInjector().get(IpfsConfig, {});
      let ipfsConfig = defaultsDeep(config, defaultIpfsConfig);
      console.log(ipfsConfig);
      let node = new IPFS(ipfsConfig);
      node.on('ready', (err: Error) => {
        if (err) throw err;
        Injector.top.set([
          {
            provide: tokens.Ipfs,
            useValue: node,
          },
          {
            provide: tokens.IpfsPubsub,
            useValue: node.pubsub,
          },
          {
            provide: tokens.IpfsUtil,
            useValue: node.util,
          },
          {
            provide: tokens.IpfsConfig,
            useValue: node.config,
          },
          {
            provide: tokens.IpfsTypes,
            useValue: node.types,
          },
          {
            provide: tokens.IpfsStats,
            useValue: node.stats,
          },
          {
            provide: tokens.IpfsSwarm,
            useValue: node.swarm,
          },
          {
            provide: tokens.IpfsPin,
            useValue: node.pin,
          },
          {
            provide: tokens.IpfsObject,
            useValue: node.object,
          },
          {
            provide: tokens.IpfsBitswap,
            useValue: node.bitswap,
          },
          {
            provide: tokens.IpfsName,
            useValue: node.name,
          },
          {
            provide: tokens.IpfsKey,
            useValue: node.key,
          },
          {
            provide: tokens.IpfsBootstrap,
            useValue: node.bootstrap,
          },
          {
            provide: tokens.IpfsBlock,
            useValue: node.block,
          },
          {
            provide: tokens.IpfsDag,
            useValue: node.dag,
          },
          {
            provide: tokens.IpfsDht,
            useValue: node.dht,
          },
          {
            provide: tokens.IpfsDns,
            useValue: node.dns,
          },
          {
            provide: tokens.IpfsFiles,
            useValue: node.files,
          },
          {
            provide: tokens.IpfsRepo,
            useValue: node.repo,
          },
        ]);
        return resolve(node);
      });
    });
  },
  deps: [],
})
export class ImsIpfs {}
