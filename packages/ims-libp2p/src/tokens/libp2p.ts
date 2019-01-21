import { InjectionToken } from 'ims-core';
export interface Libp2p {}
export const Libp2p = new InjectionToken('Libp2p');
export interface Libp2pConfig {}
export const Libp2pConfig = new InjectionToken('Libp2pConfig');
export interface Libp2pFactory {
  create(config: Libp2pConfig): Libp2p;
}
export const Libp2pFactory = new InjectionToken('Libp2pFactory');
