import { Cid } from '../cid';

export class IpfsBlock {
  get data(): Buffer {
    return this._data;
  }
  set data(val: Buffer) {
    throw new Error('Tried to change an immutable block');
  }

  get cid(): Cid {
    return this._cid;
  }

  set cid(val: Cid) {
    throw new Error('Tried to change an immutable block');
  }
  constructor(public _data: Buffer, public _cid: Cid) {}
}

export abstract class IpfsBlockFactory {
  abstract create(data: Buffer): IpfsBlock;
}
