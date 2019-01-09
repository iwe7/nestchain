export abstract class BaseX {
  constructor(ALPHABET: string) {}
  abstract encode(source: Buffer): string;
  abstract decodeUnsafe(source: string): Buffer;
  abstract decode(str: string): Buffer;
}
