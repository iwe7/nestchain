import { providers as hostProviders } from './host';
import { NgModule } from 'ims-core';
@NgModule({
  providers: [...hostProviders],
})
export class ImsGulpTscModule {}
