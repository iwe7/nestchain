export abstract class Varint {
  decodeBytes: number;
  abstract encode(
    num: number,
    buffer?: number[] | Buffer,
    offset?: number,
  ): Buffer;
  abstract decode(buf: number[] | Buffer, offset?: number): number;
  abstract encodingLength(num: number): number;
}
