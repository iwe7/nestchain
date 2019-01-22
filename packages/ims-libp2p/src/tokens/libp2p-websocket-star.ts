import { InjectionToken, Type } from 'ims-core';
export interface Libp2pWebsocketStar {
  discovery: any;
  new (opt?: any): Libp2pWebsocketStar;
}
export const Libp2pWebsocketStar = new InjectionToken<
  Type<Libp2pWebsocketStar>
>('Libp2pWebsocketStar');
