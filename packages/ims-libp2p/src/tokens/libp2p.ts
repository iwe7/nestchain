import { InjectionToken, Type } from 'ims-core';
export interface Libp2p {
  peerInfo: any;
  peerBook: any;
  peerRouting: any;
  new (config: Libp2pConfig): Libp2p;
  start(callback: Function): void;
  once(type: string, callback: Function): void;
  dial(peer: any, callback: Function): void;
  on(type: string, callback: Function): void;
}
export const Libp2p = new InjectionToken<Type<Libp2p>>('Libp2p');

export interface Libp2pConfig {
  connectionManager?: any;
  datastore?: any;
  peerInfo: any;
  peerBook?: any;
  modules: {
    connEncryption?: any[];
    connProtector?: {
      protect: Function;
    };
    contentRouting?: any[];
    dht?: any;
    peerDiscovery?: any[];
    peerRouting?: any[];
    streamMuxer?: any[];
    // min 1
    transport: any[];
  };
  config: {
    peerDiscovery?: any;
    relay?: {
      enabled?: boolean;
      hop?: {
        enabled?: boolean;
        active?: boolean;
      };
    };
    dht?: {
      kBucketSize?: number;
      enabledDiscovery?: boolean;
      validators?: any;
      selectors?: any;
    };
    EXPERIMENTAL?: {
      dht?: boolean;
      pubsub?: boolean;
    };
  };
}
export interface Libp2pConfigFactory {
  (cfg: Libp2pConfig): Promise<Libp2pConfig>;
}
export const Libp2pConfigFactory = new InjectionToken<Libp2pConfigFactory>(
  'Libp2pConfigFactory',
);
export const Libp2pConfig = new InjectionToken<Libp2pConfig[]>('Libp2pConfig');
export interface Libp2pFactory {
  (config?: Libp2pConfig): Promise<Libp2p>;
}
export const Libp2pFactory = new InjectionToken<Libp2pFactory>('Libp2pFactory');
