import { StaticProvider, BaseXFactory } from 'ims-core';
import { BaseXImpl, BaseXFactoryImpl } from './base-x';
export default function createProvider(): StaticProvider[] {
  const provider: StaticProvider[] = [
    {
      provide: BaseXFactory,
      useClass: BaseXFactoryImpl,
      deps: [],
    },
  ];
  return provider;
}

export function createBasex(ALPHABET: string) {
  return new BaseXImpl(ALPHABET);
}
