import { Buffer } from 'buffer';
import { BaseX } from 'ims-core';
export class BaseXImpl extends BaseX {
  BASE: number;
  LEADER: string;
  FACTOR: number;
  iFACTOR: number;
  BASE_MAP: Uint8Array;
  _alphabet: string;
  get ALPHABET() {
    return this._alphabet;
  }
  set ALPHABET(ALPHABET: string) {
    this._alphabet = ALPHABET;
    this.BASE_MAP = new Uint8Array(256);
    this.BASE_MAP.fill(255);
    for (let i = 0; i < ALPHABET.length; i++) {
      const x = ALPHABET.charAt(i);
      const xc = x.charCodeAt(0);
      if (this.BASE_MAP[xc] !== 255) throw new TypeError(x + ' is ambiguous');
      this.BASE_MAP[xc] = i;
    }
    this.BASE = this._alphabet.length;
    this.LEADER = this._alphabet.charAt(0);
    this.FACTOR = Math.log(this.BASE) / Math.log(256);
    this.iFACTOR = Math.log(256) / Math.log(this.BASE);
  }
  constructor(ALPHABET: string) {
    super(ALPHABET);
    this.ALPHABET = ALPHABET;
  }
  encode(source: Buffer): string {
    if (!Buffer.isBuffer(source)) throw new TypeError('Expected Buffer');
    if (source.length === 0) return '';
    // Skip & count leading zeroes.
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    // Allocate enough space in big-endian base58 representation.
    const size = ((pend - pbegin) * this.iFACTOR + 1) >>> 0;
    const b58 = new Uint8Array(size);
    // Process the bytes.
    while (pbegin !== pend) {
      let carry = source[pbegin];
      // Apply "b58 = b58 * 256 + ch".
      let i = 0;
      for (
        let it = size - 1;
        (carry !== 0 || i < length) && it !== -1;
        it--, i++
      ) {
        carry += (256 * b58[it]) >>> 0;
        b58[it] = carry % this.BASE >>> 0;
        carry = (carry / this.BASE) >>> 0;
      }
      if (carry !== 0) throw new Error('Non-zero carry');
      length = i;
      pbegin++;
    }
    // Skip leading zeroes in base58 result.
    let it = size - length;
    while (it !== size && b58[it] === 0) {
      it++;
    }
    // Translate the result into a string.
    let str = this.LEADER.repeat(zeroes);
    for (; it < size; ++it) str += this.ALPHABET.charAt(b58[it]);
    return str;
  }
  decodeUnsafe(source: string): Buffer {
    if (typeof source !== 'string') throw new TypeError('Expected String');
    if (source.length === 0) return Buffer.alloc(0);
    let psz = 0;
    // Skip leading spaces.
    if (source[psz] === ' ') return;
    // Skip and count leading '1's.
    let zeroes = 0;
    let length = 0;
    while (source[psz] === this.LEADER) {
      zeroes++;
      psz++;
    }
    // Allocate enough space in big-endian base256 representation.
    const size = ((source.length - psz) * this.FACTOR + 1) >>> 0; // log(58) / log(256), rounded up.
    const b256 = new Uint8Array(size);
    // Process the characters.
    while (source[psz]) {
      // Decode character
      let carry = this.BASE_MAP[source.charCodeAt(psz)];

      // Invalid character
      if (carry === 255) return;

      let i = 0;
      for (
        let it = size - 1;
        (carry !== 0 || i < length) && it !== -1;
        it--, i++
      ) {
        carry += (this.BASE * b256[it]) >>> 0;
        b256[it] = carry % 256 >>> 0;
        carry = (carry / 256) >>> 0;
      }
      if (carry !== 0) throw new Error('Non-zero carry');
      length = i;
      psz++;
    }
    // Skip trailing spaces.
    if (source[psz] === ' ') return;
    // Skip leading zeroes in b256.
    let it = size - length;
    while (it !== size && b256[it] === 0) {
      it++;
    }
    const vch = Buffer.allocUnsafe(zeroes + (size - it));
    vch.fill(0x00, 0, zeroes);
    let j = zeroes;
    while (it !== size) {
      vch[j++] = b256[it++];
    }
    return vch;
  }
  decode(str: string): Buffer {
    const buffer = this.decodeUnsafe(str);
    if (buffer) return buffer;
    throw new Error('Non-base' + this.BASE + ' character');
  }
}
