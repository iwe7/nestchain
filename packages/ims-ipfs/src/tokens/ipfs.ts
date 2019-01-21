import { InjectionToken, Type, Injector } from 'ims-core';
export interface Ipfs {}
export const Ipfs = new InjectionToken<Type<Ipfs>>('Ipfs');
export interface IpfsFactory {
  injector: Injector;
  create(): Promise<Ipfs>;
}
export const IpfsFactory = new InjectionToken<IpfsFactory>('IpfsFactory');
export const IpfsInstance = new InjectionToken<Ipfs>('IpfsInstance');
