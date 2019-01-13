import { Multihash, Varint, Injector, BaseXFactory, NgModule } from 'ims-core';
import { MultihashImpl } from './multihash';
import { VarintModule } from 'ims-varint';
import { BaseXModule } from 'ims-base-x';
import { Multihashing } from './multihashing';

@NgModule({
  providers: [
    {
      provide: Multihash,
      useFactory: (injector: Injector) => {
        return new MultihashImpl(
          injector.get(BaseXFactory),
          injector.get(Varint),
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
