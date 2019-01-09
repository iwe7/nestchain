import { StaticProvider, Varint } from 'ims-core';
import { VarintImpl } from './varint';
export default function createProvider() {
  const provider: StaticProvider = {
    provide: Varint,
    useFactory: () => {
      return new VarintImpl();
    },
    deps: [],
  };
  return provider;
}
