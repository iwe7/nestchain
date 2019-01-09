import { Multicodec, Varint } from 'ims-core';
import { MulticodecBase } from './base';

export class MulticodecImpl extends Multicodec {
  constructor(varint: Varint) {
    super();
    this.varint = varint;
  }
  addPrefix(multicodecStrOrCode: Buffer | string, data: Buffer): Buffer {
    let prefix;
    if (Buffer.isBuffer(multicodecStrOrCode)) {
      prefix = this.varintBufferEncode(multicodecStrOrCode);
    } else {
      if (this.varints[multicodecStrOrCode]) {
        prefix = this.varints[multicodecStrOrCode];
      } else {
        throw new Error('multicodec not recognized');
      }
    }
    return Buffer.concat([prefix, data]);
  }
  rmPrefix(data: Buffer): Buffer {
    this.varint.decode(data);
    return data.slice(this.varint.decodeBytes);
  }
  getCodec(prefixedData: number[] | Buffer): string {
    const code = this.varintBufferDecode(prefixedData);
    const codecName = this.names[code.toString('hex')];
    if (codecName === undefined) {
      throw new Error('Code `0x' + code.toString('hex') + '` not found');
    }
    return codecName;
  }
  getCodeVarint(codecName: string): string {
    const code = this.names[codecName];
    if (code === undefined) {
      throw new Error('Codec `' + codecName + '` not found');
    }
    return code;
  }
  private bufferToNumber(buf: Buffer) {
    return parseInt(buf.toString('hex'), 16);
  }
  private numberToBuffer(num: number) {
    let hexString = num.toString(16);
    if (hexString.length % 2 === 1) {
      hexString = '0' + hexString;
    }
    return Buffer.from(hexString, 'hex');
  }
  private varintBufferEncode(input: Buffer) {
    return Buffer.from(this.varint.encode(this.bufferToNumber(input)));
  }
  private varintBufferDecode(input: number[] | Buffer) {
    return this.numberToBuffer(this.varint.decode(input));
  }

  get varints() {
    let that = this;
    return (baseTable => {
      let nameTable = {};
      for (let encodingName in baseTable) {
        let code = baseTable[encodingName];
        nameTable[encodingName] = that.varintBufferEncode(code);
      }
      return nameTable;
    })(MulticodecBase);
  }

  get names() {
    return (baseTable => {
      let nameTable = {};
      for (let encodingName in baseTable) {
        let code = baseTable[encodingName];
        nameTable[code.toString('hex')] = encodingName;
      }
      return nameTable;
    })(MulticodecBase);
  }
}
