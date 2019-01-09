import { Multihash } from './multihash';
import { Multicodec } from './multicodec';
import { Multibase } from './multibase';

export abstract class Cid {
  get [Symbol.for('type')]() {
    return '@ims/core/cid';
  }
  readonly mh: Multihash;
  readonly mc: Multicodec;
  readonly mb: Multibase;

  readonly version: number;
  readonly codec: string;
  readonly multihash: Buffer;

  abstract toV0(): any;
  abstract toV1(): any;
  abstract toBaseEncodedString(base: string): string;
  abstract toString(base: string): string;
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
