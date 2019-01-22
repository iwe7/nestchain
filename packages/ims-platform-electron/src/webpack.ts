import { NgModule, SourceRoot } from 'ims-core';
import { ImsWebpackModule } from 'ims-platform-webpack';

@NgModule({
  providers: [
    {
      provide: SourceRoot,
      useValue: join(ROOT, 'src/demo'),
    },
  ],
  imports: [ImsWebpackModule],
})
export class ImsPlatformElectronWebpackModule {}
