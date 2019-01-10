import { EventEmitter } from 'events';

interface IIpfsRepo {
  init;
  version;
  gc;
  stat;
}

interface IpfsBootstrap {
  list;
  add;
  rm;
}

interface IpfsConfig {
  get;
  set;
  replace;
}

interface IpfsBlock {
  get;
  put;
  rm;
  stat;
}

interface IpfsObject {
  new;
  put;
  get;
  data;
  links;
  stat;
  patch;
}
interface IpfsDag {
  put;
  get;
  tree;
  _getRecursive;
}
interface IpfsLibp2p {
  start;
  stop;
}
interface IpfsSwarm {
  peers;
  addrs;
  localAddrs;
  connect;
  disconnect;
}
import { IpfsRepo } from './repo';
import { PeerBook } from './peer_book';
import { PeerInfo } from './peer_info';
import { IpfsBlockService } from './block-service';

export abstract class Ipfs extends EventEmitter {
  repo: IIpfsRepo;
  bootstrap: IpfsBootstrap;
  config: IpfsConfig;
  block: IpfsBlock;
  object: IpfsObject;
  dag: IpfsDag;
  libp2p: IpfsLibp2p;
  swarm: IpfsSwarm;

  _repo: IpfsRepo;
  _peerInfoBook: PeerBook;
  _peerInfo: PeerInfo;
  _blockService: IpfsBlockService;

  abstract init(): any;
  abstract preStart(): Promise<void>;
  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
  abstract isOnline(): boolean;
  abstract id(): any;
  abstract ping(): any;
  abstract pingPullStream(): any;
  abstract pingReadableStream(): any;
  abstract version(): any;
  shutdown(): any {
    return this.stop();
  }
}
export interface IpfsOptions {
  storageBackends?: any;
  storageBackendOptions?: any;
  repo?: string;
  init?: boolean;
  start?: boolean;
  pass?: string;
  silent?: boolean;
  relay?: {
    enabled: boolean;
    hop: {
      enabled: boolean;
      active: boolean;
    };
  };
  preload?: {
    enabled: boolean;
    addresses: string[];
  };
  EXPERIMENTAL?: {
    pubsub: boolean;
    sharding: boolean;
    dht: boolean;
  };
  config?: any;
  libp2p?: any;
  connectionManager?: any;
}
export abstract class IpfsFactory {
  abstract create(options?: IpfsOptions): Ipfs;
}
