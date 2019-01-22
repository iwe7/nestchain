import { NgModule, AppInitialization, Injector } from 'ims-core';
import express = require('express');
import * as tokens from './tokens';
import { IndexRouter } from './routes';
@NgModule({
  providers: [
    IndexRouter,
    {
      provide: AppInitialization,
      useValue: async (injector: Injector) => {
        let app = await injector.get(tokens.App);
        return app;
      },
      multi: true,
    },
    {
      provide: tokens.App,
      useFactory: async (injector: Injector) => {
        let app = express();
        let routes = await injector.get(tokens.AppRoutes);
        routes.forEach(route => {
          if (route.method === 'get') {
            app.get(route.path, async (req, res, next) => {
              let action = await route.action(injector);
              let result = await action.instance[action.propertyKey]();
              debugger;
            });
          } else {
            app.post(route.path, async (req, res, next) => {
              let params = req.params;
              let action = await route.action(injector);
              let result = await action.instance[action.propertyKey]();
              debugger;
            });
          }
        });
        app.get('/', (req, res, next) => {
          res.end('hello');
        });
        return app;
      },
      deps: [Injector],
      multi: true,
    },
  ],
  imports: [],
})
export class ImsApiModule {}
