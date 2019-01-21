import { Provider } from 'ims-core';
import * as tokens from 'ims-tokens';
import { promises } from 'fs';
import { EventEmitter } from 'events';
export default [
  {
    provide: tokens.Express,
    useValue: require('express'),
  },
  {
    provide: tokens.ServeStatic,
    useValue: require('serve-static'),
  },
  {
    provide: tokens.Assert,
    useValue: require('assert'),
  },
  {
    provide: tokens.Schedule,
    useValue: require('node-schedule'),
  },
  {
    provide: tokens.LoggerFactory,
    useValue: require('log4js'),
  },
  {
    provide: tokens.Debug,
    useValue: require('debug'),
  },
  {
    provide: tokens.FsmEvent,
    useValue: require('fsm-event'),
  },
  {
    provide: tokens.Fs,
    useValue: promises,
  },
  {
    provide: tokens.Webpack,
    useValue: require('webpack'),
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
