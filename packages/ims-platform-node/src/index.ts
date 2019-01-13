import {
  createPlatformFactory,
  corePlatform,
  Compiler,
  Injector,
  StaticProvider,
  InjectionToken,
  getNgModuleStaticProvider,
  APP_INITIALIZER,
  Logger,
} from 'ims-core';
import { NgModule, NgModuleRef } from 'ims-core';
import { Multihashing, MultihashModule } from 'ims-multihash';
import { isObservable } from 'ims-rxjs';
import { isPromise } from 'ims-util';

import express = require('express');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import { LoggerModule } from 'packages/ims-logger/src';

export const RouterToken = new InjectionToken<any[]>('router token');
export const Req = new InjectionToken<any[]>('req token');
export const Res = new InjectionToken<any[]>('res token');
export const Next = new InjectionToken<any[]>('next');
export const Method = new InjectionToken<any[]>('request method');
export const Body = new InjectionToken<any[]>('request body');

export function toString(json: any) {
  if (typeof json === 'string') {
    return json;
  } else if (typeof json === 'object') {
    return JSON.stringify(json);
  } else if (Reflect.has(json, 'toString')) {
    return json.toString();
  } else {
    return 'error';
  }
}
export class CompilerImpl extends Compiler {
  constructor(public injector: Injector) {
    super();
  }
  compile(type: any): StaticProvider[] {
    let str = type.toString();
    let hashing = this.injector.get<Multihashing>(Multihashing);
    let hash = hashing.hash(Buffer.from(str)).toString('hex');
    return [
      {
        provide: RouterToken,
        useValue: {
          path: hash,
          fn: (req, res, next, injector) => {
            let args = req.body;
            try {
              let instance = injector.get(type);
              let params = req.params;
              if (Reflect.has(instance, params.method)) {
                let json = instance[params.method](...args);
                if (isObservable(json)) {
                  json.subscribe(data => res.end(toString(data)));
                } else if (isPromise(json)) {
                  json.then(data => res.end(toString(data)));
                } else {
                  res.end(toString(json));
                }
              }
              res.end(`not found 404`);
            } catch (e) {
              debugger;
              res.end(`not found 500`);
            }
          },
        },
        multi: true,
      },
    ];
  }
}

export const nodePlatform = createPlatformFactory(
  corePlatform,
  'node-platform',
  [
    {
      provide: Compiler,
      useFactory: (injector: Injector) => new CompilerImpl(injector),
      deps: [Injector],
    },
    () => getNgModuleStaticProvider(MultihashModule),
    () => getNgModuleStaticProvider(LoggerModule),
    {
      provide: RouterToken,
      useValue: {
        path: '/',
        fn: (req, res, next, injector) => {
          res.end('hello imeepos');
        },
      },
      deps: [],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useValue: (injector: Injector) => {
        let logger = injector.get<Logger>(Logger);
        logger.subscribe(res => console.log(res));
        let routers = injector.get(RouterToken);
        let app = express();
        app.use(cookieParser('imeepos'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('*', (req, res, next) => {
          injector.set([
            {
              provide: Req,
              useValue: req,
            },
            {
              provide: Res,
              useValue: res,
            },
            {
              provide: Next,
              useValue: next,
            },
            {
              provide: Method,
              useValue: req.method.toLowerCase(),
            },
            {
              provide: Body,
              useValue: req.body,
            },
          ]);
          next();
        });
        routers.map(router => {
          logger.info(`start router ${router.path}`);
          app.use(`/${router.path}/:method`, (req, res, next) => {
            logger.info(
              `request router ${router.path}:${req.method.toLowerCase()}`,
            );
            router.fn(req, res, next, injector);
            next();
          });
        });
        app.listen(3000, '0.0.0.0', (err: Error) => {
          logger.info('app start at 3000');
        });
      },
      multi: true,
    },
  ],
);

export class ImsNodeModule {}
export async function bootstrap(cfg: NgModule) {
  NgModule(cfg)(ImsNodeModule);
  try {
    let platform = await nodePlatform();
    let ref = await platform.bootstrapModule(ImsNodeModule);
    return ref;
  } catch (e) {
    throw e;
  }
}
