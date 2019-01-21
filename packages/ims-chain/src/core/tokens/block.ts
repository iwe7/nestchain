import { CID } from './cid';
import { InjectionToken, Type, Injector } from 'ims-core';

export interface Block {
  readonly data: Buffer;
  readonly cid: CID;
  new (data: Buffer, cid: CID): Block;
}

export const Block = new InjectionToken<Type<Block>>('Block');
export interface BlockFactory {
  injector: Injector;
  create(data: Buffer, cid: CID): Promise<Block>;
}
export const BlockFactory = new InjectionToken('BlockFactory');
