import { Injectable, InjectionToken, Injector, Type } from 'ims-core';
import { Observable } from 'ims-rxjs';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');

import { WebpackConfigurations, PluginsToken } from './token';

export const WebpackPlugins = new InjectionToken('WebpackPlugins');

let emptyConfig: webpack.Configuration = {
  entry: {},
};

export function isWebpackWatching(val: any): val is webpack.Watching {
  return val && Reflect.has(val, 'close') && Reflect.has(val, 'invalidate');
}
@Injectable({
  providedIn: 'root',
})
export class ImsWebpack {
  watching: webpack.Compiler.Watching;
  webpack: webpack.Compiler;
  options: webpack.Configuration;
  constructor(public injector: Injector) {
    this.init();
  }

  init() {
    let configurations = this.injector.get<webpack.Configuration[]>(
      WebpackConfigurations,
      [emptyConfig],
    );
    let plugins = this.injector
      .get<Type<any>[]>(PluginsToken)
      .map(it => this.injector.get(it));
    this.options = webpackMerge(...configurations, {
      plugins,
    });
    let dev = webpack(this.options);
    if (isWebpackWatching(dev)) {
      this.watching = dev;
    } else {
      this.webpack = dev;
    }
  }

  watch(
    watchOptions: webpack.Compiler.WatchOptions,
  ): Observable<webpack.Stats> {
    return new Observable(obs => {
      this.watching = this.webpack.watch(
        watchOptions,
        (err: Error, stats: webpack.Stats) => {
          if (err) return obs.error(err);
          obs.next(stats);
        },
      );
    });
  }

  run(): Promise<webpack.Stats> {
    if (!this.webpack) {
      console.log('this.webpack is undefined');
    }
    return new Promise((resolve, reject) => {
      this.webpack.run((err: Error, stats: webpack.Stats) => {
        if (err) return reject(err);
        resolve(stats);
      });
    });
  }
}
