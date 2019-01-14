import { expressEngine, RouterToken, ExpressConfig } from './engine';
import { CompilerImpl } from './compiler';
import { Compiler, APP_INITIALIZER, Injector } from 'ims-core';
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
  {
    provide: Compiler,
    useFactory: (injector: Injector) => new CompilerImpl(injector),
    deps: [Injector],
  },
];
export * from './compiler';
export * from './engine';
