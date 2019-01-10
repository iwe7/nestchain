import { Cid } from '../../cid';
import { PeerInfo } from '../peer_info';

interface FindProvidersOptions {
  maxTimeout: number;
}
export abstract class DelegatedContentRouting {
  abstract findProviders(
    key: Cid,
    options: FindProvidersOptions | number,
  ): Promise<PeerInfo[]>;
  abstract provide(key: Cid): Promise<void>;
}
