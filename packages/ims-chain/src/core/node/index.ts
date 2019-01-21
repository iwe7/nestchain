import repo from './repo';
import block from './block';
import cid from './cid';
import log from './log';
import boot from './boot';
import options from './options';
import init from './init';
import start from './start';
import state from './state';
import library from './library';

import { Provider } from 'ims-core';

export default [
  ...repo,
  ...block,
  ...cid,
  ...log,
  ...boot,
  ...options,
  ...init,
  ...start,
  ...state,
  ...library
] as Provider[];
