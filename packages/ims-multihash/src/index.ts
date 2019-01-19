import { Multihash, Varint, Injector, BaseXFactory, NgModule } from 'ims-core';
import { MultihashImpl } from './multihash';
import { VarintModule } from 'ims-varint';
import { BaseXModule } from 'ims-base-x';
import { Multihashing } from './multihashing';

@NgModule({
  providers: [
    {
      provide: Multihash,
      useFactory: async (injector: Injector) => {
        return new MultihashImpl(
          await injector.get<BaseXFactory>(BaseXFactory),
          await injector.get<Varint>(Varint),
        );
      },
      deps: [Injector],
    },
    Multihashing,
  ],
  imports: [VarintModule, BaseXModule],
})
export class MultihashModule {}

export * from './multihashing';
