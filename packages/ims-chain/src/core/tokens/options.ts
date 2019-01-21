import { InjectionToken } from 'ims-core';
import { Repo } from './repo';
import { InitOptions } from './init';
/**
 * 配置信息
 */
export interface Options {
  repo: string | Repo;
  pass: any;
  init: InitOptions;
}
export const Options = new InjectionToken<Options>('Options');
