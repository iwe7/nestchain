import { Provider } from 'ims-core';
import * as tokens from '../../tokens/index';

export default [
  {
    provide: tokens.FsmEvent,
    useValue: require('fsm-event'),
  },
] as Provider[];
