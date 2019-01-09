import { StaticProvider, Multihash, BaseX, Varint, Injector } from 'ims-core';
import { MultihashImpl } from './multihash';
export default function createProvider(): StaticProvider[] {
  const provider: StaticProvider[] = [
    {
      provide: Multihash,
      useFactory: (injector: Injector) => {
        return new MultihashImpl(injector.get(BaseX), injector.get(Varint));
      },
      deps: [Injector],
    },
  ];
  return provider;
}

export * from './multihash';
