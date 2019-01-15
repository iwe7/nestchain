import {
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  PLATFORM_INITIALIZER,
} from 'ims-core';
import { Observable } from 'ims-rxjs';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');

export const WebpackConfigurations = new InjectionToken<
  webpack.Configuration[]
>('WebpackConfigurations');

export const WebpackPlugins = new InjectionToken('WebpackPlugins');

let emptyConfig: webpack.Configuration = {
  entry: {},
};
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
    this.options = webpackMerge(...configurations);
    let dev = webpack(this.options);
    if (dev instanceof webpack.Compiler.Watching) {
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
