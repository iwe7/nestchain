import { Varint } from './varint';

export abstract class Multicodec {
  varint: Varint;
  abstract addPrefix(multicodecStrOrCode: any, data: Buffer): Buffer;
  abstract rmPrefix(data: Buffer): Buffer;
  abstract getCodec(prefixedData: number[] | Buffer): string;
  abstract getCodeVarint(codecName: string): string;
}
