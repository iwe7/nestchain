import {
  createPlatformFactory,
  corePlatform,
  PLATFORM_INITIALIZER,
  Injector,
  NgModule,
} from 'ims-core';
import { WebpackConfigurations, PluginsToken, OutputToken } from './token';
import { ImsWebpackProgressPlugin } from './plugins/progress';
import { ImsWebpackHtmlPlugin } from './plugins/html';
import { Output } from 'webpack';
import { join } from 'path';

import { ROOT } from 'ims-const';

export let webpackPlatform = createPlatformFactory(corePlatform, 'platform webpack', [
  {
    provide: PluginsToken,
    multi: true,
    useValue: ImsWebpackProgressPlugin,
  },
  {
    provide: PluginsToken,
    multi: true,
    useValue: ImsWebpackHtmlPlugin,
  },
  {
    provide: OutputToken,
    useValue: {
      path: join(ROOT, 'dist'),
    } as Output,
  },
  {
    provide: WebpackConfigurations,
    multi: true,
    useValue: {
      module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
      },
      plugins: [],
    },
  },
]);

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
