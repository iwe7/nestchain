import { StaticProvider, CidFactory, Injector } from 'ims-core';
import { CidImpl } from './cid';
export class CidFactoryImpl extends CidFactory {
  constructor(private injector: Injector) {
    super();
  }
  create(version: number, codec?: string, multihash?: Buffer): CidImpl {
    return new CidImpl(version, this.injector, codec, multihash);
  }
}
export default function createProviders() {
  const provider: StaticProvider[] = [
    {
      provide: CidFactory,
      useClass: CidFactoryImpl,
      deps: [Injector],
    },
  ];
  return provider;
}
