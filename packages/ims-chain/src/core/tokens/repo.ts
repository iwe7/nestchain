import { InjectionToken, Type, Injector } from 'ims-core';
import { Block } from './block';
import { CID } from './cid';

/**
 * repo类
 */
export interface Repo {
  closed: boolean;
  blocks: {
    put(block: Block, callback: Function): void;
    putMany(blocks: Block[], callback: Function): void;
    get(cid: CID, callback: Function): void;
  };
  // todo remove any
  datastore: any;
  config: {
    set(key: string, value: any, callback: Function): void;
    get(value: any, callback: Function): void;
    get(key: string, callback: Function): void;
    get(callback: Function): void;
    exists(callback: Function): void;
  };
  version: {
    get(callback: Function): void;
    set(version: number, callback: Function): void;
  };
  apiAddr: {
    get(callback: Function): void;
    set(value: any, callback: Function): void;
  };
  // todo remove options:any
  new (path: string, options?: any): Repo;
  // todo remove function
  init(callback: Function): void;
  // todo remove function
  open(): Promise<void>;
  open(callback: Function): void;
  // todo remove function
  close(callback: Function): void;
  // todo remove function
  exists(callback: Function): void;
  put(key: any, value: Buffer, callback: Function): void;
  get(key: any, callback: Function): void;

  stat(options: any, callback: Function): void;
  stat(callback: Function): void;

  lock(dir: string, callback: Function): void;
  close(callback: Function): void;
  locked(callback: Function): void;
}
export const Repo = new InjectionToken<Type<Repo>>('Repo');

/**
 * repo工厂
 */
export interface RepoFactory {
  injector: Injector;
  // todo remove any
  create(path: string): Promise<Repo>;
}
export const RepoFactory = new InjectionToken<RepoFactory>('RepoFactory');
