import { NgModule } from 'ims-core';
import { HttpNodeBackend } from './httpBackend';
import { HttpBackend } from 'ims-http';

@NgModule({
  providers: [
    {
      provide: HttpBackend,
      useClass: HttpNodeBackend,
      deps: [],
    },
  ],
})
export class ImsPlatformWxappModule {}
