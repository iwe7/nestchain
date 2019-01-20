import {
  NgModule,
  AppRoot,
  Injector,
  SourceRoot,
  PlatformName,
  AppName,
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

@NgModule({
  providers: [
    {
      provide: PluginsToken,
      multi: true,
      useFactory: (bar: ProgressBar) => new ImsWebpackProgressPlugin(bar),
      deps: [ProgressBar],
    },
    {
      provide: PluginsToken,
      useFactory: (injector: Injector) => new ImsWebpackHtmlPlugin(),
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
      useFactory: async (injector: Injector) => {
        let appname = await injector.get(AppName, ROOT);
        let platform = await injector.get(PlatformName, 'web');
        return {
          path: join(ROOT, 'www/', appname, 'template', platform),
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
      useValue: join(ROOT, 'src/demo'),
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
          alias: {
            '@nodeutils/defaults-deep': 'ims-defaults-deep',
          },
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
  ],
})
export class ImsWebpackModule {}
