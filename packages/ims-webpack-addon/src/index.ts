import { NgModule } from 'ims-core';
import { WebpackConfigurations } from 'ims-platform-webpack';
import { join } from 'path';
import { ROOT } from 'ims-const';

@NgModule({
  providers: [
    {
      provide: WebpackConfigurations,
      useValue: {
        entry: {
          main: join(ROOT, 'src/main.ts'),
        },
      },
      multi: true,
    },
  ],
  imports: [],
})
export class ImsWebpackAddonModule {}
