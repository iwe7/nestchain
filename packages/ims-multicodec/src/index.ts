import { Multicodec, StaticProvider, Varint, NgModule, Inject } from 'ims-core';
import { MulticodecImpl } from './multicodec';
import { VarintModule } from 'ims-varint';

@NgModule({
  providers: [
    {
      provide: Multicodec,
      useFactory: (varint: Varint) => new MulticodecImpl(varint),
      deps: [Varint],
    },
  ],
  imports: [VarintModule],
})
export class MulticodecModule {}
