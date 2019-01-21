import { InjectionToken, Injector } from 'ims-core';

export interface CID {
  new (baseEncodedString: string): CID;
  new (buf: Buffer): CID;
  new (version: number, codec: string, multihash: string): CID;
}
export const CID = new InjectionToken<CID>('CID');

export interface CIDFactory {
  injector: Injector;
  create(baseEncodedString: string): Promise<CID>;
  create(buf: Buffer): Promise<CID>;
  create(version: number, codec: string, multihash: string): Promise<CID>;
}
export const CIDFactory = new InjectionToken<CIDFactory>('CIDFactory');
