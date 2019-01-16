import {
  createPlatformFactory,
  corePlatform,
  PLATFORM_INITIALIZER,
  Injector,
  NgModule,
} from 'ims-core';
import { WebpackConfigurations, PluginsToken } from './token';
import { ProgressPlugin } from 'webpack';
import { ImsWebpackProgressPlugin } from './plugins/progress';
let webpackPlatform = createPlatformFactory(corePlatform, 'platform webpack', [
  {
    provide: PLATFORM_INITIALIZER,
    useValue: (injector: Injector) => {
      console.log('platform init');
    },
    multi: true,
  },
  {
    provide: PluginsToken,
    multi: true,
    useValue: ImsWebpackProgressPlugin,
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
