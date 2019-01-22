import {
  Injectable,
  InjectionToken,
  Injector,
  Type,
  DevOpen,
  DevPort,
  AppRoot,
  PlatformName,
  DevWatch,
} from 'ims-core';
import { Observable, Subject, from } from 'ims-rxjs';
import webpack = require('webpack');
import webpackMerge = require('webpack-merge');
import webpackDevServer = require('webpack-dev-server');
import {
  WebpackConfigurations,
  PluginsToken,
  OutputToken,
  resolvePluginsToken,
} from './token';
import { ROOT } from 'ims-const';
import { join } from 'path';
import { toArray } from 'ims-util';

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

  devOpen: boolean;
  devWatch: boolean;
  port: number;
  root: string;

  logs: Subject<any> = new Subject();
  private injector: Injector;
  constructor() {}
  async init(injector: Injector) {
    this.injector = injector;
    let configurations = await injector.get<webpack.Configuration[]>(
      WebpackConfigurations,
      [emptyConfig],
    );
    let plugins = await injector.get<Type<any>[]>(PluginsToken, []);
    let output = await injector.get(OutputToken, {});
    let resolvePlugins = (await injector.get(resolvePluginsToken)) || [];
    this.devOpen = await injector.get(DevOpen, true);
    this.devWatch = await injector.get(DevWatch, true);
    this.port = await injector.get(DevPort, 8088);
    this.options = webpackMerge(...configurations, {
      entry: {},
      plugins,
      output: output,
      mode: this.devOpen ? 'development' : 'production',
      watch: this.devWatch ? true : false,
      resolve: {
        plugins: toArray(resolvePlugins),
      },
    });
    let dev = webpack(this.options);
    if (isWebpackWatching(dev)) {
      this.watching = dev;
    } else {
      this.webpack = dev;
    }
  }

  apply(): Observable<any> {
    if (this.devOpen) {
      return from(this.server());
    } else {
      if (this.devWatch) {
        return this.watch({});
      } else {
        return this.run();
      }
    }
  }

  private async server() {
    /**
     * 根目录
     */
    let appRoot = await this.injector.get(AppRoot, ROOT);
    let platform = await this.injector.get(PlatformName, 'web');
    this.root = join(appRoot, 'template', platform);
    let dev = new webpackDevServer(this.webpack, {
      hot: true,
      inline: true,
    });
    dev.listen(this.port, '0.0.0.0',() => {
      console.log(`http://0.0.0.0:${this.port}`);
    });
  }

  private watch(watchOptions: webpack.Compiler.WatchOptions): Observable<any> {
    this.watching = this.webpack.watch(
      watchOptions,
      (err: Error, stats: webpack.Stats) => {
        if (err) return this.logs.error(err);
        this.logs.next(stats);
      },
    );
    return this.logs;
  }

  private run(): Observable<any> {
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
