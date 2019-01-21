import { Provider } from 'ims-core';
import * as tokens from 'ims-tokens';
export default [
  {
    provide: tokens.Path,
    useValue: require('path'),
  },
  {
    provide: tokens.Process,
    useValue: process,
  },
  {
    provide: tokens.Dirname,
    useValue: __dirname,
  },
  {
    provide: tokens.Filename,
    useValue: __filename,
  },
  {
    provide: tokens.Util,
    useValue: require('util'),
  },
  {
    provide: tokens.Fetch,
    useValue: require('node-fetch'),
  },
] as Provider[];
