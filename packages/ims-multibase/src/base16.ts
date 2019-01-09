import { MultiBase } from './base';

export class Base16 extends MultiBase {
  encode(input: string | Buffer): string {
    if (typeof input === 'string') {
      return Buffer.from(input).toString('hex');
    }
    return input.toString('hex');
  }
  decode(input: string): Buffer {
    for (let char of input) {
      if (this.alphabet.indexOf(char) < 0) {
        throw new Error('invalid base16 character');
      }
    }
    return Buffer.from(input, 'hex');
  }
}
