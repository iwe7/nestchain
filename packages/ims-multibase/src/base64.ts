import { MultiBase } from './base';

export class Base64 extends MultiBase {
  get padding() {
    return this.alphabet.indexOf('=') > -1;
  }
  get url() {
    return this.alphabet.indexOf('-') > -1 && this.alphabet.indexOf('_') > -1;
  }
  encode(input: string | Buffer): string {
    let output = '';
    if (typeof input === 'string') {
      output = Buffer.from(input).toString('base64');
    } else {
      output = input.toString('base64');
    }
    if (this.url) {
      output = output.replace(/\+/g, '-').replace(/\//g, '_');
    }
    const pad = output.indexOf('=');
    if (pad > 0 && !this.padding) {
      output = output.substring(0, pad);
    }
    return output;
  }
  decode(input: string): Buffer {
    for (let char of input) {
      if (this.alphabet.indexOf(char) < 0) {
        throw new Error('invalid base64 character');
      }
    }
    return Buffer.from(input, 'base64');
  }
}
