import { expressEngine, RouterToken, ExpressConfig } from './engine';
import { CompilerImpl } from './compiler';
import { Injector } from 'ims-core';
export const providers = [
  {
    provide: APP_INITIALIZER,
    useValue: expressEngine,
    multi: true,
  },
  {
    provide: RouterToken,
    useValue: {
      path: '/',
      fn: (req, res, next, injector) => {
        res.end('welcome to use imeepos!');
      },
    },
    multi: true,
  },
  {
    provide: ExpressConfig,
    useValue: {
      host: '0.0.0.0',
      port: 3000,
    },
  },
];
export * from './compiler';
export * from './engine';
