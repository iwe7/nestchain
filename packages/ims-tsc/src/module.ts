import { hostProviders } from './host';
import { programProviders } from './program';
import { tansformProviders } from './transform';
import { visitorProviders } from './visitor';
import { NgModule } from 'ims-core';
@NgModule({
  providers: [
    ...hostProviders,
    ...programProviders,
    ...tansformProviders,
    ...visitorProviders,
  ],
})
export class ImsTscModule {}
