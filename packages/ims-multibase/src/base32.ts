import { MultiBase } from './base';

export class Base32 extends MultiBase {
  encode(input: string | Buffer): string {
    if (typeof input === 'string') {
      return encode(Buffer.from(input), this.alphabet);
    }
    return encode(input, this.alphabet);
  }
  decode(input: string): Buffer {
    for (let char of input) {
      if (this.alphabet.indexOf(char) < 0) {
        throw new Error('invalid base32 character');
      }
    }
    return decode(input, this.alphabet);
  }
}

function decode(input: string, alphabet: string): any {
  input = input.replace(new RegExp('=', 'g'), '');
  let length = input.length;
  let bits = 0;
  let value = 0;
  let index = 0;
  let output = new Uint8Array(((length * 5) / 8) | 0);
  for (let i = 0; i < length; i++) {
    value = (value << 5) | alphabet.indexOf(input[i]);
    bits += 5;

    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255;
      bits -= 8;
    }
  }
  return output.buffer;
}

function encode(buffer: Buffer, alphabet: string) {
  let length = buffer.byteLength;
  let view = new Uint8Array(buffer);
  let padding = alphabet.indexOf('=') === alphabet.length - 1;

  if (padding) {
    alphabet = alphabet.substring(0, alphabet.length - 2);
  }

  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < length; i++) {
    value = (value << 8) | view[i];
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  if (padding) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }
  return output;
}
