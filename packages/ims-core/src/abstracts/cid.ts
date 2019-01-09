import { MultibaseType } from './multibase';
import { Injector } from '@angular/core';

export abstract class Cid {
  get [Symbol.for('type')]() {
    return '@ims/core/cid';
  }
  version: number;
  codec: string;
  multihash: Buffer;

  abstract toV0(): any;
  abstract toV1(): any;
  abstract toBaseEncodedString(base?: MultibaseType): string;
  abstract toString(base: MultibaseType): string;
  abstract toJSON(): CidJson;
  abstract equals(other: Cid): boolean;
  abstract validateCid(other: Cid): any;
  static isCid(val: any): val is Cid {
    return this[Symbol.for('type')] === '@ims/core/cid';
  }
}
export interface CidJson {
  codec: string;
  version: number;
  hash: Buffer;
}

export abstract class CidFactory {
  abstract create(
    version: number | string | Buffer,
    codec?: string,
    multihash?: Buffer,
  ): Cid;
}
