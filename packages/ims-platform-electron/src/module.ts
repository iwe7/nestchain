import { NgModule } from 'ims-core';
import { HttpXhrBackend } from 'ims-platform-browser';
import { HttpBackend } from 'ims-http';

@NgModule({
  providers: [
    {
      provide: HttpBackend,
      useClass: HttpXhrBackend,
      deps: [],
    },
  ],
})
export class ImsPlatformElectronModule {}
