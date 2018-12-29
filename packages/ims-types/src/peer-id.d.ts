declare module 'peer-id' {
  class PeerId {
    id: string;
    privKey: string;
    pubKey: string;
    constructor(id: string, privKey: string, pubKey: string);
    marshalPubKey(): any;
    marshalPrivKey(): any;
    toPrint(): any;
    toJSON(): {
      id: string;
      privKey: string;
      pubKey: string;
    };
    toHexString(): string;
    toBytes(): string;
    toB58String(): string;
    isEqual(id: PeerId): boolean;
    isValid(callback: (err: Error) => any): any;
  }
  namespace PeerId {
    function create(opts: any, callback: (err: Error, id: PeerId) => any): any;
    function createFromHexString(str: string): PeerId;
    function createFromBytes(buf: Buffer): PeerId;
    function createFromB58String(str: string): PeerId;
    function createFromPubKey(
      key: string,
      callback: (err: Error, id: PeerId) => any,
    ): any;
    function createFromPrivKey(
      key: string,
      callback: (err: Error, id: PeerId) => any,
    ): any;
    function createFromJSON(
      obj: any,
      callback: (err: Error, id: PeerId) => any,
    ): any;
    function isPeerId(id: any): id is PeerId;
  }
  export = PeerId;
}
