import { Injector, InjectionToken } from 'ims-core';
import express = require('express');
export const RouterToken = new InjectionToken<any[]>('router token');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
export const ExpressConfig = new InjectionToken<{ host: string; port: number }>(
  'express config',
);
export const Req = new InjectionToken<any[]>('req token');
export const Res = new InjectionToken<any[]>('res token');
export const Next = new InjectionToken<any[]>('next');
export const Method = new InjectionToken<any[]>('request method');
export const Body = new InjectionToken<any[]>('request body');

export const expressEngine = (injector: Injector) => {
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
    app.use(`/${router.path}/:method`, (req, res, next) => {
      router.fn(req, res, next, injector);
      next();
    });
  });
  let config = injector.get(ExpressConfig);
  app.listen(config.port, config.host, (err: Error) => {
    console.log(`app start at http://${config.host}:${config.port}`);
  });
};
