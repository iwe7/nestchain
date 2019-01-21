import { Provider } from 'ims-core';
import * as tokens from '../../tokens/index';
export default [
  {
    provide: tokens.Options,
    useValue: {
      repo: 'ipfs',
    } as tokens.Options,
  },
] as Provider[];
