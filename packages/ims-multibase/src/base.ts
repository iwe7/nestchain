import { MultibaseType } from 'ims-core';
export interface BaseEngine {
  decode(input: string): string;
  decodeUnsafe(input: string): string;
  encode(input: Buffer): Buffer;
}
export class Base {
  engine: BaseEngine;
  constructor(
    public name: MultibaseType,
    public code: string,
    public alphabet: string,
    implementation?: (alphabet: string) => any,
  ) {
    if (implementation && alphabet) {
      this.engine = implementation(alphabet);
    } else {
      this.engine = null;
    }
  }

  encode(type: Buffer): Buffer {
    return this.engine && this.engine.encode(type);
  }

  decode(type: string): string {
    return this.engine && this.engine.decode(type);
  }

  isImplemented(): BaseEngine {
    return this.engine;
  }
}

export abstract class MultiBase {
  constructor(public readonly alphabet: string) {}
  abstract encode(input: string | Buffer): string;
  abstract decode(input: string): Buffer;
}
