import { Provider } from 'ims-core';
import * as tokens from '../../tokens/index';
import debug = require('debug');
export default [
  {
    provide: tokens.Log,
    useValue: debug('ipfs'),
  },
  {
    provide: tokens.LogErr,
    useValue: debug('ipfs:err'),
  },
] as Provider[];
