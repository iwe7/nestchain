import {
  makeDecorator,
  TypeDecorator,
  getMetadata,
  isClassMetadata,
} from 'ims-decorator';
import { IInjector, Type } from 'ims-core';
export const ServerMetadataKey = 'ServerMetadataKey';
export interface ServerOptions {
  port?: number;
  host?: string;
  backlog?: number;
  path?: string;
  exclusive?: boolean;
  readableAll?: boolean;
  writableAll?: boolean;
  routes: IInjector;
}
export interface ServerDecorator {
  (opt?: ServerOptions): TypeDecorator;
}
export const Server: ServerDecorator = makeDecorator(
  ServerMetadataKey,
  'visitServer',
  dir => dir,
);

import express = require('express');
import http = require('http');

import { RouterFactory } from './router';
import { inject, Injector, setInject, InjectionToken } from 'ims-injector';
import { isPromise } from 'ims-util';
import { isObservable } from 'rxjs';
import { ResMetadataKey, ResToken } from './res';
import { ReqToken } from './req';
export const ServerToken = new InjectionToken('ServerToken');
export class ServerFactory {
  static create<T>(type: Type<T>): any {
    let meta = getMetadata(type);
    let app = express();
    let server = new http.Server(app);
    setInject({
      provide: ServerToken,
      useValue: server,
    });
    meta.forEach(it => {
      if (it.metadataKey === ServerMetadataKey) {
        if (isClassMetadata<ServerOptions>(it)) {
          let { routes, ...opts } = it.metadataDef;
          Object.keys(routes)
            .map(key => routes[key])
            .map(route => RouterFactory.create(route))
            .map(it => {
              let router = express.Router();
              let { children, instance } = it;
              children.map(child => {
                router[child.method](child.path, (req, res, next) => {
                  setInject({
                    provide: ReqToken,
                    useValue: req,
                  });
                  setInject({
                    provide: ResToken,
                    useValue: res,
                  });
                  try {
                    let data = instance[child.action].bind(instance)();
                    if (isPromise(data)) {
                      data.then(it => res.end(it));
                    } else if (isObservable(data)) {
                      data.toPromise().then(it => res.end(it));
                    } else {
                      res.end(data);
                    }
                  } catch (e) {
                    next(e);
                  }
                });
              });
              app.use(router);
            });
          server.listen(opts);
        }
      }
    });
    return {
      instance: inject(type),
      app,
      server,
    };
  }
}
