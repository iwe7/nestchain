import { Injectable, InjectionToken, Injector, Type } from 'ims-core';
import { Observable, Subject } from 'ims-rxjs';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');

import { WebpackConfigurations, PluginsToken, OutputToken } from './token';

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

  logs: Subject<any> = new Subject();
  constructor() {}

  init(injector: Injector) {
    let configurations = injector.get<webpack.Configuration[]>(
      WebpackConfigurations,
      [emptyConfig],
    );
    let plugins = injector.get<Type<any>[]>(PluginsToken, []);
    let output = injector.get(OutputToken, {});
    this.options = webpackMerge(...configurations, {
      entry: {},
      plugins,
      output: output,
    });
    debugger;
    let dev = webpack(this.options);
    if (isWebpackWatching(dev)) {
      this.watching = dev;
    } else {
      this.webpack = dev;
    }
  }

  watch(watchOptions: webpack.Compiler.WatchOptions): Observable<any> {
    this.watching = this.webpack.watch(
      watchOptions,
      (err: Error, stats: webpack.Stats) => {
        if (err) return this.logs.error(err);
        this.logs.next(stats);
      },
    );
    return this.logs;
  }

  run(): Observable<any> {
    if (!this.webpack) {
      console.log('this.webpack is undefined');
    }
    this.webpack.run((err: Error, stats: webpack.Stats) => {
      if (err) {
        this.logs.error(err);
      }
      this.logs.next(stats);
      this.logs.complete();
    });
    return this.logs;
  }
}
