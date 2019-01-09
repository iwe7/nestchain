import { StaticProvider, BaseX } from 'ims-core';
import { BaseXImpl } from './base-x';
export default function createProvider(ALPHABET: string) {
  const provider: StaticProvider = {
    provide: BaseX,
    useFactory: () => {
      return new BaseXImpl(ALPHABET);
    },
    deps: [],
  };
  return provider;
}
