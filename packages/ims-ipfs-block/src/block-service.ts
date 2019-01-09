import { IpfsBlockService, Cid, IpfsBlock } from 'ims-core';

export class BlockService extends IpfsBlockService {
  constructor(ipfsRepo) {
    super();
    this._repo = ipfsRepo;
    this._bitswap = null;
  }
  setExchange(bitswap): void {}
  unsetExchange(): void {}
  hasExchange(): boolean {}
  put(block: IpfsBlock): Promise<any> {}
  putMany(blocks: IpfsBlock[]): Promise<any> {}
  get(cid: Cid): Promise<IpfsBlock> {}
  getMany(cids: Cid[]): Promise<IpfsBlock[]> {}
  delete(cid: Cid): Promise<any> {}
}
