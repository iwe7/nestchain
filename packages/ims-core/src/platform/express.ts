import { createPlatformFactory } from '../createPlatform';
import { corePlatform } from './core';
import { APP_INITIALIZER } from '../application_init';
import express = require('express');
import http = require('http');
import { InjectionToken } from '../di/injection_token';
import { Injector } from '../di/injector';
export const RoutesToken = new InjectionToken('Routes Token');
export const ConfigToken = new InjectionToken('Config Token');

export const expressPlatform = createPlatformFactory(corePlatform, 'express', [
  {
    provide: RoutesToken,
    useValue: (req, res, next) => {
      res.end('routes');
    },
    multi: true,
  },
  {
    provide: ConfigToken,
    useValue: {
      host: '0.0.0.0',
      port: 3000,
    },
  },
  {
    provide: APP_INITIALIZER,
    useFactory: function(injector: Injector) {
      return () =>
        new Promise((res, int) => {
          let routes = injector.get<any[]>(RoutesToken);
          let config = injector.get<any>(ConfigToken);
          let app = express();
          routes.map(route => {
            app.use(route);
          });
          let server = new http.Server(app);
          server.listen(config.port, config.host, () => {
            res();
          });
        });
    },
    multi: true,
    deps: [Injector],
  },
]);
