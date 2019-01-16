import { NgModule } from 'ims-core';
import { WebpackConfigurations } from 'ims-platform-webpack';
import { join } from 'path';
import { ROOT } from 'ims-const';
import { Configuration } from 'webpack';

@NgModule({
  providers: [
    {
      provide: WebpackConfigurations,
      useValue: {
        entry: {
          main: join(ROOT, 'src/demo.ts'),
        },
      } as Configuration,
      multi: true,
    }
  ],
  imports: [],
})
export class ImsWebpackAddonModule {}
