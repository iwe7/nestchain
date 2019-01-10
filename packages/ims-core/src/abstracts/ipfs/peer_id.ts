export abstract class PeerId {
  abstract get id(): string;
  abstract set id(val: string);

  abstract get privKey(): string;
  abstract set privKey(val: string);

  abstract get pubKey(): string;
  abstract set pubKey(val: string);

  abstract marshalPubKey(): any;
  abstract marshalPrivKey(): any;
  abstract toPrint(): string;
  abstract toJSON(): PeerIdJson;
  abstract toHexString(): string;
  abstract toBytes(): string;
  abstract toB58String(): string;
  abstract isEqual(id: PeerId | Buffer): boolean;
  abstract isValid(): Promise<boolean>;
}

export interface PeerIdJson {
  id: string;
  privKey: string;
  pubKey: string;
}

export abstract class PeerIdFactory {
  abstract create(opts: any): Promise<PeerId>;
  abstract createFromHexString(str: string): PeerId;
  abstract createFromBytes(buf: Buffer): PeerId;
  abstract createFromB58String(str: string): PeerId;
  abstract createFromPubKey(key: any): Promise<PeerId>;
  abstract createFromPrivKey(key: any): Promise<PeerId>;
  abstract createFromJSON(cfg: PeerIdJson): Promise<PeerId>;
  abstract isPeerId(id: any): id is PeerId;
}
