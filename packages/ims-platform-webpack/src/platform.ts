import {
  createPlatformFactory,
  corePlatform,
  NgModule,
  AppRoot,
  Injector,
  SourceRoot,
  PlatformName,
  getNgModuleStaticProvider,
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
import { ImsWebpackHashedModuleIdsPlugin } from './plugins/hashedModuleIdsPlugin';
import { Multihashing, MultihashModule } from 'ims-multihash';

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
      provide: PluginsToken,
      useFactory: (hash: Multihashing) =>
        new ImsWebpackHashedModuleIdsPlugin(hash),
      deps: [Multihashing],
      multi: true,
    },
    {
      provide: OutputToken,
      useFactory: async (injector: Injector) => {
        let appRoot = await injector.get(AppRoot, ROOT);
        let platform = await injector.get(PlatformName, 'web');
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
          modules: ['packages', 'node_modules'],
          extensions: ['.ts', '.tsx', '.js', '.json', '.html', '.scss', '.css'],
        },
      } as Configuration,
    },
    {
      provide: resolvePluginsToken,
      useFactory: async (injector: Injector) => {
        let sourceRoot = await injector.get(SourceRoot, ROOT);
        return new TsconfigPathsPlugin({
          configFile: join(sourceRoot, 'tsconfig.json'),
        });
      },
      deps: [Injector],
      multi: true,
    },
    () => getNgModuleStaticProvider(MultihashModule),
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
