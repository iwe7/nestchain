import {
  NgModule,
  AppRoot,
  Injector,
  SourceRoot,
  DevOpen,
  DevPort,
  AppInitialization,
} from 'ims-core';
import { WebpackConfigurations, ImsWebpack } from 'ims-platform-webpack';
import { join } from 'path';
import { ROOT } from 'ims-const';
import { ImsWebpackModule } from 'ims-platform-webpack';
import { Configuration } from 'webpack';

@NgModule({
  providers: [
    {
      provide: SourceRoot,
      useValue: join(ROOT, 'src/demo'),
    },
    {
      provide: WebpackConfigurations,
      useFactory: async (injector: Injector) => {
        let root = await injector.get(SourceRoot, join(ROOT, 'src/demo'));
        let devOpen = await injector.get(DevOpen, true);
        let devPort = await injector.get(DevPort, 8088);
        let cfg = {
          entry: {
            main: [join(root, 'demo.ts')],
          },
          node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
          },
          target: 'web',
          devtool: 'eval',
        } as Configuration;
        if (devOpen) {
          Object.keys(cfg.entry).forEach(key => {
            (cfg.entry[key] as string[]).unshift(
              `webpack-dev-server/client?http://localhost:${devPort}/`,
              `webpack/hot/dev-server`,
            );
          });
        }
        return cfg;
      },
      multi: true,
      deps: [Injector],
    },
    {
      provide: AppRoot,
      useValue: join(ROOT, 'www/demo'),
    },
    {
      provide: SourceRoot,
      useValue: join(ROOT, 'src/demo'),
    },
    {
      provide: AppInitialization,
      useValue: async (injector: Injector) => {
        let webpack = await injector.get<ImsWebpack>(ImsWebpack);
        await webpack.init(injector);
        // webpack.server();
        webpack.apply().subscribe(res => {
          // console.log(res);
        });
        return webpack;
      },
      multi: true,
    },
  ],
  imports: [ImsWebpackModule],
})
export class ImsWebpackAddonModule {}
