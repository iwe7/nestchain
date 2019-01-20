import { ImsWebpackModule, ImsWebpack } from 'ims-platform-webpack';
import {
  NgModule,
  AppRoot,
  Injector,
  SourceRoot,
  DevOpen,
  DevPort,
  corePlatform,
} from 'ims-core';
import { WebpackConfigurations } from 'ims-platform-webpack';
import { join } from 'path';

@NgModule({
  providers: [
    {
      provide: WebpackConfigurations,
      useFactory: async (injector: Injector) => {
        let devOpen = await injector.get(DevOpen, false);
        let devPort = await injector.get(DevPort, 4200);
        let cfg = {
          entry: {
            main: [join(__dirname, 'h5.test.ts')],
          },
        };
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
      useValue: join(__dirname, '../dist'),
    },
    {
      provide: SourceRoot,
      useValue: __dirname,
    },
  ],
  imports: [ImsWebpackModule],
})
export class ImsWebpackAddonModule {}
corePlatform([])
  .then(res => res.bootstrapModule(ImsWebpackAddonModule))
  .then(async res => {
    let webpack = await res.injector.get<ImsWebpack>(ImsWebpack);
    await webpack.init(res.injector);
    let apply = await webpack.apply();
    // webpack.server();
    apply.subscribe(res => {
      console.log(res);
    });
  });
