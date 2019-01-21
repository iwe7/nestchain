import { Provider } from 'ims-core';
import * as tokens from 'ims-tokens';
import { promises } from 'fs';
import { EventEmitter } from 'events';

export default [
  {
    provide: tokens.FsmEvent,
    useValue: require('fsm-event'),
  },
  {
    provide: tokens.Fs,
    useValue: promises,
  },
  {
    provide: tokens.EventEmitter,
    useValue: EventEmitter,
  },
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
