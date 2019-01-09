import {
  StaticProvider,
  Multihash,
  Varint,
  Injector,
  BaseXFactory,
} from 'ims-core';
import { MultihashImpl } from './multihash';
export default function createProvider(): StaticProvider[] {
  const provider: StaticProvider[] = [
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
  ];
  return provider;
}

export * from './multihash';
