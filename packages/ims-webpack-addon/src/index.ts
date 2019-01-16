import {
  NgModule,
  AppRoot,
  Injector,
  SourceRoot,
  DevOpen,
  DevPort,
} from 'ims-core';
import { WebpackConfigurations } from 'ims-platform-webpack';
import { join } from 'path';
import { ROOT } from 'ims-const';

@NgModule({
  providers: [
    {
      provide: WebpackConfigurations,
      useFactory: (injector: Injector) => {
        let root = injector.get(SourceRoot, join(ROOT, 'src/demo'));
        let devOpen = injector.get(DevOpen, false);
        let devPort = injector.get(DevPort, 4200);
        let cfg = {
          entry: {
            main: [join(root, 'demo.ts')],
          },
        };
        if (devOpen) {
          // Object.keys(cfg.entry).forEach(key => {
          //   (cfg.entry[key] as string[]).unshift(
          //     `webpack-dev-server/client?http://localhost:${devPort}/`,
          //     `webpack/hot/dev-server`
          //   );
          // });
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
  ],
  imports: [],
})
export class ImsWebpackAddonModule {}
