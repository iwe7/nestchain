import { Multibase, MultibaseType, BaseX, Injector } from 'ims-core';
import { getBase } from './getbase';
export class MultibaseImpl extends Multibase {
  constructor(private injector: Injector) {
    super();
  }
  encode(type: MultibaseType, buf: Buffer): Buffer {
    const base = this.getBase(type);
    const name = base.name;
    return this.multibase(name, Buffer.from(base.encode(buf)));
  }
  decode(bufOrString: Buffer | string): Buffer {
    if (Buffer.isBuffer(bufOrString)) {
      bufOrString = bufOrString.toString();
    }
    const code = bufOrString.substring(0, 1);
    bufOrString = bufOrString.substring(1, bufOrString.length);
    if (typeof bufOrString === 'string') {
      bufOrString = Buffer.from(bufOrString);
    }
    const base = this.getBase(code as any);
    return Buffer.from(base.decode(bufOrString.toString()));
  }
  private getBase(type: MultibaseType) {
    return getBase(this.injector, type);
  }
  private validEncode(name: MultibaseType, buf: Buffer) {
    const base = this.getBase(name);
    base.decode(buf.toString());
  }
  private multibase(nameOrCode: MultibaseType, buf: Buffer) {
    if (!buf) {
      throw new Error('requires an encoded buffer');
    }
    const base = getBase(this.injector, nameOrCode);
    const codeBuf = Buffer.from(base.code);
    const name = base.name;
    this.validEncode(name, buf);
    return Buffer.concat([codeBuf, buf]);
  }
}
