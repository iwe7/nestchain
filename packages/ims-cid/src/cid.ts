import { Cid, Multihash, CidJson } from 'ims-core';

function checkCIDComponents(cid: Cid, mh: Multihash) {
  if (cid == null) {
    return 'null values are not valid CIDs';
  }
  if (!(cid.version === 0 || cid.version === 1)) {
    return 'Invalid version, must be a number equal to 1 or 0';
  }
  if (typeof cid.codec !== 'string') {
    return 'codec must be string';
  }
  if (!Buffer.isBuffer(cid.multihash)) {
    return 'multihash must be a Buffer';
  }
  try {
    mh.validate(cid.multihash);
  } catch (err) {
    let errorMsg = err.message;
    if (!errorMsg) {
      // Just in case mh.validate() throws an error with empty error message
      errorMsg = 'Multihash validation failed';
    }
    return errorMsg;
  }
  return '';
}
export class CidImpl extends Cid {
  constructor(public mh: Multihash) {
    super();
  }
  toV0(): any {
    if (this.codec !== 'dag-pb') {
      throw new Error('Cannot convert a non dag-pb CID to CIDv0');
    }
    const { name, length } = this.mh.decode(this.multihash);
    if (name !== 'sha2-256') {
      throw new Error('Cannot convert non sha2-256 multihash CID to CIDv0');
    }

    if (length !== 32) {
      throw new Error('Cannot convert non 32 byte multihash CID to CIDv0');
    }
    return new CidImpl(0, this.codec, this.multihash);
  }
  toV1(): any {
    return new CidImpl(1, this.codec, this.multihash);
  }
  toBaseEncodedString(base): string {
    base = base || 'base58btc';
    switch (this.version) {
      case 0: {
        if (base !== 'base58btc') {
          throw new Error(
            'not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()',
          );
        }
        return this.mh.toB58String(this.multihash);
      }
      case 1:
        return this.mh.encode(base, this.buffer).toString();
      default:
        throw new Error('Unsupported version');
    }
  }
  toString(base: string): string {
    return this.toBaseEncodedString(base);
  }
  toJSON(): CidJson {
    return {
      codec: this.codec,
      version: this.version,
      hash: this.multihash,
    };
  }
  equals(other: CidImpl): boolean {
    return (
      this.codec === other.codec &&
      this.version === other.version &&
      this.multihash.equals(other.multihash)
    );
  }
  validateCid(other: Cid): any {
    let errorMsg = checkCIDComponents(other, this.mh);
    if (errorMsg) {
      throw new Error(errorMsg);
    }
  }
}
