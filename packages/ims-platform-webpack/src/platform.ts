import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  AppRoot,
  Injector,
  SourceRoot,
  PlatformName,
} from 'ims-core';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import {
  WebpackConfigurations,
  PluginsToken,
  OutputToken,
  resolvePluginsToken,
} from './token';
import { ImsWebpackProgressPlugin } from './plugins/progress';
import { ImsWebpackHtmlPlugin } from './plugins/html';
import { Output, Configuration } from 'webpack';
import { join } from 'path';

import { ROOT } from 'ims-const';
import { ProgressBar } from 'ims-single-linelog';
import { ImsWebpackHotModuleReplacementPlugin } from './plugins/hotModuleReplacement';
import { ImsWebpackNamedModulesPlugin } from './plugins/noEmitOnErrors';
import { ImsWebpackCopyPlugin } from './plugins/copy';

export let webpackPlatform = createPlatformFactory(
  corePlatform,
  'platform webpack',
  [
    {
      provide: PluginsToken,
      multi: true,
      useFactory: (bar: ProgressBar) => new ImsWebpackProgressPlugin(bar),
      deps: [ProgressBar],
    },
    {
      provide: PluginsToken,
      useFactory: (injector: Injector) => new ImsWebpackHtmlPlugin(injector),
      deps: [Injector],
      multi: true,
    },
    {
      provide: PluginsToken,
      useFactory: (injector: Injector) =>
        new ImsWebpackHotModuleReplacementPlugin(),
      deps: [Injector],
      multi: true,
    },
    {
      provide: PluginsToken,
      useFactory: (injector: Injector) => new ImsWebpackNamedModulesPlugin(),
      deps: [Injector],
      multi: true,
    },
    {
      provide: PluginsToken,
      useFactory: (injector: Injector) => new ImsWebpackCopyPlugin(injector),
      deps: [Injector],
      multi: true,
    },
    {
      provide: OutputToken,
      useFactory: (injector: Injector) => {
        let appRoot = injector.get(AppRoot, ROOT);
        let platform = injector.get(PlatformName, 'web');
        return {
          path: join(appRoot, 'template', platform),
          filename: `[name].js`,
        } as Output;
      },
      deps: [Injector],
    },
    {
      provide: AppRoot,
      useValue: ROOT,
    },
    {
      provide: PlatformName,
      useValue: 'mobile',
    },
    {
      provide: SourceRoot,
      useValue: ROOT,
    },
    {
      provide: WebpackConfigurations,
      multi: true,
      useValue: {
        module: {
          rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
              test: /\.(htm|html|xml|wxml)$/,
              use: ['raw-loader'],
            },
          ],
        },
        plugins: [],
        resolve: {
          plugins: [],
          modules: ['node_modules', 'packages'],
          alias: {
            'ims-': join(ROOT, 'packages'),
          },
        },
      } as Configuration,
    },
    {
      provide: resolvePluginsToken,
      useFactory: (injector: Injector) => {
        let sourceRoot = injector.get(SourceRoot, ROOT);
        return new TsconfigPathsPlugin({
          configFile: join(sourceRoot, 'tsconfig.json'),
        });
      },
      deps: [Injector],
      multi: true,
    },
  ],
);

class ImsWebapckModule {}
export async function bootstrap(cfg: NgModule) {
  NgModule(cfg)(ImsWebapckModule);
  try {
    let platform = await webpackPlatform();
    let ref = await platform.bootstrapModule(ImsWebapckModule);
    return ref;
  } catch (e) {
    throw e;
  }
}
