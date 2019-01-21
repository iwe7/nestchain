import { Injectable, Injector } from 'ims-core';
import * as tokens from '../../tokens/index';

@Injectable({
  providedIn: 'root',
})
export class BlockFactory implements tokens.BlockFactory {
  constructor(public injector: Injector) {}
  async create(data: Buffer, cid: tokens.CID) {
    let Block = await this.injector.get(tokens.Block);
    let instance = new Block(data, cid);
    return instance;
  }
}
