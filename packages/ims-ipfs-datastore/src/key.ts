import { KeyFactory, Key, StaticProvider } from 'ims-core';
const pathSepS = '/';
const pathSepB = Buffer.from(pathSepS);
const pathSep = pathSepB[0];
const uuid = require('uuid/v4');
export class KeyImpl extends Key {
  _buf: Buffer;
  constructor(s: string | Buffer, clean: boolean = true) {
    super();
    if (typeof s === 'string') {
      this._buf = Buffer.from(s);
    } else if (Buffer.isBuffer(s)) {
      this._buf = s;
    }
    if (clean) {
      this.clean();
    }
    if (this._buf.length === 0 || this._buf[0] !== pathSep) {
      throw new Error(`Invalid key: ${this.toString()}`);
    }
  }
  toString(encoding: string = 'utf8'): string {
    return this._buf.toString(encoding);
  }
  toBuffer(): Buffer {
    return this._buf;
  }
  clean(): void {
    if (!this._buf || this._buf.length === 0) {
      this._buf = Buffer.from(pathSepS);
    }
    if (this._buf[0] !== pathSep) {
      this._buf = Buffer.concat([pathSepB, this._buf]);
    }
    // normalize does not remove trailing slashes
    while (
      this._buf.length > 1 &&
      this._buf[this._buf.length - 1] === pathSep
    ) {
      this._buf = this._buf.slice(0, -1);
    }
  }
  less(key: Key): boolean {
    const list1 = this.list();
    const list2 = key.list();
    for (let i = 0; i < list1.length; i++) {
      if (list2.length < i + 1) {
        return false;
      }
      const c1 = list1[i];
      const c2 = list2[i];
      if (c1 < c2) {
        return true;
      } else if (c1 > c2) {
        return false;
      }
    }
    return list1.length < list2.length;
  }
  static withNamespaces(list: string[]): Key {
    return new KeyImpl(list.join(pathSepS));
  }
  reverse(): Key {
    return KeyImpl.withNamespaces(
      this.list()
        .slice()
        .reverse(),
    );
  }
  namespaces(): string[] {
    return this.list();
  }
  baseNamespace(): string {
    const ns = this.namespaces();
    return ns[ns.length - 1];
  }
  list(): string[] {
    return this.toString()
      .split(pathSepS)
      .slice(1);
  }
  type(): string {
    return namespaceType(this.baseNamespace());
  }
  name(): string {
    return namespaceValue(this.baseNamespace());
  }
  instance(s: string): Key {
    return new KeyImpl(this.toString() + ':' + s);
  }
  path(): Key {
    let p = this.parent().toString();
    if (!p.endsWith(pathSepS)) {
      p += pathSepS;
    }
    p += this.type();
    return new KeyImpl(p);
  }
  parent(): Key {
    const list = this.list();
    if (list.length === 1) {
      return new KeyImpl(pathSepS);
    }
    return new KeyImpl(list.slice(0, -1).join(pathSepS));
  }
  child(key: Key): Key {
    if (this.toString() === pathSepS) {
      return key;
    } else if (key.toString() === pathSepS) {
      return this;
    }
    return new KeyImpl(this.toString() + key.toString(), false);
  }
  isAncestorOf(other: Key): boolean {
    if (other.toString() === this.toString()) {
      return false;
    }
    return other.toString().startsWith(this.toString());
  }
  isDecendantOf(other: Key): boolean {
    if (other.toString() === this.toString()) {
      return false;
    }
    return this.toString().startsWith(other.toString());
  }
  isTopLevel(): boolean {
    return this.list().length === 1;
  }
}
export class KeyFactoryImpl extends KeyFactory {
  withNamespaces(list: string[]): Key {
    return new KeyImpl(list.join(pathSepS));
  }
  random(): Key {
    return new KeyImpl(uuid().replace(/-/g, ''));
  }
  create(str: string | Buffer, clean: boolean = true): Key {
    return new KeyImpl(str, clean);
  }
}

function namespaceType(ns: string): string {
  const parts = ns.split(':');
  if (parts.length < 2) {
    return '';
  }
  return parts.slice(0, -1).join(':');
}

function namespaceValue(ns: string): string {
  const parts = ns.split(':');
  return parts[parts.length - 1];
}

export const KeyProvider: StaticProvider = {
  provide: KeyFactory,
  useClass: KeyFactoryImpl,
  deps: [],
};
