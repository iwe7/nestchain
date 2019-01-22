import { InjectionToken, Type } from 'ims-core';
export interface Libp2pWebrtcStar {
  discovery: any;
  new (opt: any): Libp2pWebrtcStar;
}
export const Libp2pWebrtcStar = new InjectionToken<Type<Libp2pWebrtcStar>>(
  'Libp2pWebrtcStar',
);
