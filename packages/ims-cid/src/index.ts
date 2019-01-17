import { CidFactory, Injector, NgModule } from 'ims-core';
import { CidImpl } from './cid';
import { MultihashModule } from 'ims-multihash';
import { MulticodecModule } from 'ims-multicodec';
import { MultibaseModule } from 'ims-multibase';

export class CidFactoryImpl extends CidFactory {
  constructor(private injector: Injector) {
    super();
  }
  create(
    version: number | string | Buffer,
    codec?: string,
    multihash?: Buffer,
  ): CidImpl {
    return new CidImpl(version, this.injector, codec, multihash);
  }
}

@NgModule({
  providers: [
    {
      provide: CidFactory,
      useFactory: (injector: Injector) => new CidFactoryImpl(injector),
      deps: [Injector],
    },
  ],
  imports: [MultihashModule, MulticodecModule, MultibaseModule],
})
export class CidModule {}
