import {
  Cid,
  CidJson,
  Injector,
  MultibaseType,
  Multicodec,
  Multibase,
  Multihash,
} from 'ims-core';

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
  mh: Multihash;
  mc: Multicodec;
  mb: Multibase;
  injector: Injector;
  constructor(
    version: number | string | Buffer,
    injector: Injector,
    codec?: string,
    multihash?: Buffer,
  ) {
    super();
    this.injector = injector;
    this.mh = this.injector.get(Multihash);
    this.mc = this.injector.get(Multicodec);
    this.mb = this.injector.get(Multibase);
    if (typeof version === 'string') {
      if (this.mb.isEncoded(version)) {
        const cid = this.mb.decode(version);
        version = parseInt(cid.slice(0, 1).toString('hex'), 16);
        codec = this.mc.getCodec(cid.slice(1));
        multihash = this.mc.rmPrefix(cid.slice(1));
      } else {
        codec = 'dag-pb';
        multihash = this.mh.fromB58String(version);
        version = 0;
      }
    } else if (Buffer.isBuffer(version)) {
      const firstByte = version.slice(0, 1);
      const v = parseInt(firstByte.toString('hex'), 16);
      if (v === 0 || v === 1) {
        // CID
        const cid = version;
        version = v;
        codec = this.mc.getCodec(cid.slice(1));
        multihash = this.mc.rmPrefix(cid.slice(1));
      } else {
        // multihash
        codec = 'dag-pb';
        multihash = version;
        version = 0;
      }
    }
    this.version = version;
    this.codec = codec;
    this.multihash = multihash;
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
    return new CidImpl(0, this.injector, this.codec, this.multihash);
  }
  toV1(): any {
    return new CidImpl(1, this.injector, this.codec, this.multihash);
  }
  get buffer() {
    switch (this.version) {
      case 0:
        return this.multihash;
      case 1:
        return Buffer.concat([
          Buffer.from('01', 'hex'),
          this.mc.getCodeVarint(this.codec) as any,
          this.multihash,
        ]);
      default:
        throw new Error('unsupported version');
    }
  }
  get prefix() {
    return Buffer.concat([
      Buffer.from(`0${this.version}`, 'hex'),
      this.mc.getCodeVarint(this.codec),
      this.mh.prefix(this.multihash),
    ]);
  }
  toBaseEncodedString(base: MultibaseType): string {
    base = base || MultibaseType.base58btc;
    switch (this.version) {
      case 0: {
        if (base !== MultibaseType.base58btc) {
          throw new Error(
            'not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()',
          );
        }
        return this.mh.toB58String(this.multihash);
      }
      case 1:
        return this.mb.encode(base, this.buffer).toString();
      default:
        throw new Error('Unsupported version');
    }
  }
  toString(base: MultibaseType): string {
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
