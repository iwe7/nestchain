import { CidFactory, Injector, NgModule } from 'ims-core';
import { CidImpl } from './cid';

export class CidFactoryImpl extends CidFactory {
  constructor(private injector: Injector) {
    super();
  }
  create(version: number, codec?: string, multihash?: Buffer): CidImpl {
    return new CidImpl(version, this.injector, codec, multihash);
  }
}

@NgModule({
  providers: [
    {
      provide: CidFactory,
      useClass: CidFactoryImpl,
      deps: [Injector],
    },
  ],
})
export class CidModule {}
