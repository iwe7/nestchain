import { Injector, Injectable } from 'ims-core';
import IPFS = require('ipfs');
import * as tokens from './token';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return new Promise<void>((resolve, reject) => {
      let node = new IPFS();
      node.on('ready', (err: Error) => {
        if (err) reject(err);
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
        resolve();
      });
    });
  },
  deps: [],
})
export class ImsIpfs {}
