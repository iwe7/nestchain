import { Cid, Injector, Injectable } from 'ims-core';
const CID = require('cids');
@Injectable({
  providedIn: 'root',
})
export class CidFactory {
  constructor(public injector: Injector) {}
  create(
    version: number | string | Buffer,
    codec?: string,
    multihash?: Buffer,
  ): Cid {
    return new CID(version, codec, multihash);
  }
}
