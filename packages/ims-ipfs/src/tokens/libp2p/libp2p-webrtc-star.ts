import { InjectionToken, Type } from 'ims-core';
export interface Libp2pWebrtcStar {}
export const Libp2pWebrtcStar = new InjectionToken<Type<Libp2pWebrtcStar>>(
  'Libp2pWebrtcStar',
);

export interface Libp2pWebrtcStarFactory {
  create(): Promise<Libp2pWebrtcStar>;
}
export const Libp2pWebrtcStarFactory = new InjectionToken<
  Libp2pWebrtcStarFactory
>('Libp2pWebrtcStarFactory');
