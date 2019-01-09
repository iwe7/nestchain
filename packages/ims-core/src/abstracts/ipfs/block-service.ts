import { IpfsBlock } from './block';
import { Cid } from '../cid';

export abstract class IpfsBlockService {
  _bitswap: any;
  _repo: any;
  abstract setExchange(bitswap): void;
  abstract unsetExchange(): void;
  abstract hasExchange(): boolean;
  abstract put(block: IpfsBlock): Promise<any>;
  abstract putMany(blocks: IpfsBlock[]): Promise<any>;
  abstract get(cid: Cid): Promise<IpfsBlock>;
  abstract getMany(cids: Cid[]): Promise<IpfsBlock[]>;
  abstract delete(cid: Cid): Promise<any>;
}
