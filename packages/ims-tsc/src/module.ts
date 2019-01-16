import { providers as hostProviders } from './host';
import { providers as programProviders } from './program';

import { NgModule } from 'ims-core';

@NgModule({
  providers: [...hostProviders, ...programProviders],
})
export class ImsTscModule {}
