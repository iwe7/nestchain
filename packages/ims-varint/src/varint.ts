import { Varint } from 'ims-core';
let bytes: number = 0;
const N1 = Math.pow(2, 7);
const N2 = Math.pow(2, 14);
const N3 = Math.pow(2, 21);
const N4 = Math.pow(2, 28);
const N5 = Math.pow(2, 35);
const N6 = Math.pow(2, 42);
const N7 = Math.pow(2, 49);
const N8 = Math.pow(2, 56);
const N9 = Math.pow(2, 63);
const MSB = 0x80,
  REST = 0x7f,
  INT = Math.pow(2, 31),
  MSBALL = ~REST;

export class VarintImpl extends Varint {
  encode(num: number, buffer?: number[] | Buffer, offset?: number): Buffer {
    let out = buffer || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
      out[offset++] = (num & 0xff) | MSB;
      num /= 128;
    }
    while (num & MSBALL) {
      out[offset++] = (num & 0xff) | MSB;
      num >>>= 7;
    }
    out[offset] = num | 0;
    bytes = offset - oldOffset + 1;
    if (Buffer.isBuffer(out)) {
      return out;
    } else {
      return Buffer.from(out);
    }
  }
  decode(buf: number[] | Buffer, offset: number = 0): number {
    let counter = offset;
    let l: number = buf.length;
    let res = 0,
      shift = 0,
      b: number;
    do {
      if (counter >= l) {
        this.decodeBytes = 0;
        throw new RangeError('Could not decode varint');
      }
      b = buf[counter++];
      res += shift < 28 ? (b & REST) << shift : (b & REST) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB);
    this.decodeBytes = counter - offset;
    return res;
  }
  encodingLength(value: number): number {
    return value < N1
      ? 1
      : value < N2
      ? 2
      : value < N3
      ? 3
      : value < N4
      ? 4
      : value < N5
      ? 5
      : value < N6
      ? 6
      : value < N7
      ? 7
      : value < N8
      ? 8
      : value < N9
      ? 9
      : 10;
  }
}
