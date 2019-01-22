import { InjectionToken } from 'ims-core';
export interface PeerInfo {
  id: any;
}
export interface PeerInfoFactory {
  (): Promise<PeerInfo>;
}
export const PeerInfoFactory = new InjectionToken<PeerInfoFactory>(
  'PeerInfoFactory',
);
