import PeerId = require('peer-id');

export class ImsPeerId {
  private peerId: any;
  constructor(id: string, privKey?: string, pubKey?: string) {
    this.peerId = new PeerId(id, privKey, pubKey);
  }
  get id(): string {
    return this.peerId.id;
  }
  set id(val: string) {
    throw new Error('Id is immutable');
  }
  get privKey() {
    return this.peerId.privKey;
  }
  set privKey(val: string) {
    this.peerId.privKey = val;
  }

  get pubKey() {
    return this.peerId.pubKey;
  }
  set pubKey(val: string) {
    this.peerId.pubKey = val;
  }

  marshalPubKey() {
    return this.peerId.marshalPubKey();
  }

  marshalPrivKey() {
    return this.peerId.marshalPrivKey();
  }

  toPrint() {
    return this.peerId.toPrint();
  }

  toJSON() {
    return this.peerId.toJSON();
  }

  toHexString() {
    return this.peerId.toHexString();
  }

  toBytes() {
    return this.peerId.toBytes();
  }

  toB58String(): string {
    return this.peerId.toB58String();
  }

  isEqual(id: string): boolean {
    return this.peerId.isEqual(id);
  }

  isValid(callback: (err: Error) => any) {
    return this.peerId.isValid(callback);
  }

  static create(
    opt: IPeerIdCreateOptions,
    callback: (err: Error, id: ImsPeerId) => any,
  ) {
    return PeerId.create(opt, callback);
  }

  static isPeerId(id: any): id is ImsPeerId {
    return PeerId.isPeerId(id);
  }

  static createFromHexString(str: string){

  }
}

export interface IPeerIdCreateOptions {
  bits: number;
}
