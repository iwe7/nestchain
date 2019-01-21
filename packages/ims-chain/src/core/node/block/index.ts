import { Provider } from 'ims-core';
import * as tokens from '../../tokens/index';
import { BlockFactory } from './factory';

export default [
  {
    provide: tokens.Block,
    useValue: require('ipfs-block'),
  },
  {
    provide: tokens.BlockFactory,
    useValue: BlockFactory,
  },
] as Provider[];
