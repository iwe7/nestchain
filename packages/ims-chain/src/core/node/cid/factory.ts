import { Injectable, Injector } from 'ims-core';
import * as tokens from '../../tokens/index';

@Injectable({
  providedIn: 'root',
})
export class CIDFactory implements tokens.CIDFactory {
  constructor(public injector: Injector) {}
  create(baseEncodedString: string): Promise<tokens.CID>;
  create(buf: Buffer): Promise<tokens.CID>;
  create(
    version: number,
    codec: string,
    multihash: string,
  ): Promise<tokens.CID>;
  async create(
    arg1: string | Buffer | number,
    codec?: string,
    multihash?: string,
  ) {
    let CID = await this.injector.get(tokens.CID);
    let instance: tokens.CID;
    if (typeof arg1 === 'string') {
      instance = new CID(arg1);
    } else if (typeof arg1 === 'number') {
      instance = new CID(arg1, codec, multihash);
    } else {
      instance = new CID(arg1);
    }
    return instance;
  }
}
