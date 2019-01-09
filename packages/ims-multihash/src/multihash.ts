import {
  Multihash,
  BaseX,
  Varint,
  MultihashDecode,
  MultihashType,
  BaseXFactory,
} from 'ims-core';
import { Buffer } from 'buffer';
export class MultihashImpl extends Multihash {
  bs58: BaseX;
  constructor(basexFactory: BaseXFactory, private varint: Varint) {
    super();
    this.bs58 = basexFactory.create(
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
    );
  }
  toHexString(hash: Buffer): string {
    if (!Buffer.isBuffer(hash)) {
      throw new Error('must be passed a buffer');
    }
    return hash.toString('hex');
  }
  fromHexString(hash: string): Buffer {
    return Buffer.from(hash, 'hex');
  }

  toB58String(hash: Buffer): string {
    if (!Buffer.isBuffer(hash)) {
      throw new Error('must be passed a buffer');
    }
    return this.bs58.encode(hash);
  }
  fromB58String(hash: string | Buffer): Buffer {
    let encoded: string;
    if (Buffer.isBuffer(hash)) {
      encoded = hash.toString();
    } else {
      encoded = hash;
    }
    return Buffer.from(this.bs58.decode(encoded));
  }

  encode(digest: Buffer, code: MultihashType, length?: number): Buffer {
    if (!digest || !code) {
      throw new Error(
        'multihash encode requires at least two args: digest, code',
      );
    }
    if (!Buffer.isBuffer(digest)) {
      throw new Error('digest should be a Buffer');
    }
    if (length == null) {
      length = digest.length;
    }
    if (length && digest.length !== length) {
      throw new Error('digest length should be equal to specified length.');
    }
    return Buffer.concat([
      Buffer.from(this.varint.encode(code)),
      Buffer.from(this.varint.encode(length)),
      digest,
    ]);
  }
  decode(buf: Buffer): MultihashDecode {
    if (!Buffer.isBuffer(buf)) {
      throw new Error('multihash must be a Buffer');
    }
    if (buf.length < 3) {
      throw new Error('multihash too short. must be > 3 bytes.');
    }
    const code = this.varint.decode(buf);
    if (!this.isValidCode(code)) {
      throw new Error(
        `multihash unknown function code: 0x${code.toString(16)}`,
      );
    }
    buf = buf.slice(this.varint.decodeBytes);
    const len = this.varint.decode(buf);
    if (len < 1) {
      throw new Error(`multihash invalid length: 0x${len.toString(16)}`);
    }
    buf = buf.slice(this.varint.decodeBytes);
    if (buf.length !== len) {
      throw new Error(
        `multihash length inconsistent: 0x${buf.toString('hex')}`,
      );
    }
    return {
      code: code,
      name: MultihashType[code],
      length: len,
      digest: buf,
    };
  }
  isAppCode(code: number): boolean {
    return code > 0 && code < 0x10;
  }
  isValidCode(code: number): boolean {
    if (this.isAppCode(code)) {
      return true;
    }
    if (MultihashType[code]) {
      return true;
    }
    return false;
  }
  prefix(multihash: Buffer): any {
    this.decode(multihash);
    return multihash.slice(0, 2);
  }

  validate(multihash: Buffer) {
    return this.decode(multihash);
  }
}
