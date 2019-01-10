import { Varint, NgModule } from 'ims-core';
import { VarintImpl } from './varint';

@NgModule({
  providers: [
    {
      provide: Varint,
      useClass: VarintImpl,
      deps: [],
    },
  ],
})
export class VarintModule {}
