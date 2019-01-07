import { NgModule } from 'ims-core';
import { HttpXhrBackend } from './httpBackend';
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
export class ImsPlatformBrowserModule {}
