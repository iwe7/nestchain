import { StaticProvider, BaseX } from 'ims-core';
import { BaseXImpl } from './base-x';
export default function createProvider(ALPHABET: string, token?: any) {
  const provider: StaticProvider = {
    provide: token || BaseX,
    useFactory: () => {
      return new BaseXImpl(ALPHABET);
    },
    deps: [],
  };
  return provider;
}

export function createBasex(ALPHABET: string) {
  return new BaseXImpl(ALPHABET);
}
