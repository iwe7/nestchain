import { Multicodec, StaticProvider, Varint } from 'ims-core';
import { MulticodecImpl } from './multicodec';

export default function createProviders(): StaticProvider[] {
  const provider: StaticProvider[] = [
    {
      provide: Multicodec,
      useClass: MulticodecImpl,
      deps: [Varint],
    },
  ];
  return provider;
}
