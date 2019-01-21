import { InjectionToken } from 'ims-core';
import { Repo } from './repo';
export interface InitOptions {
  repo?: Repo;
  bits?: number;
  pass?: any;
}
export interface Init {
  // todo remove any
  (options: InitOptions): Promise<any>;
}
export const Init = new InjectionToken<Init>('Init');
