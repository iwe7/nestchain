import { Multiaddr } from '../multiaddr';

export abstract class P2p {
  abstract dial(ma: Multiaddr, options: object): Promise<any>;
  abstract createListener(options: any, handler: Function): void;
  abstract filter(multiaddrs: any): Multiaddr[];
}
