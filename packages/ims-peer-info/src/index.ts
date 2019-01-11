import { NgModule, PeerInfoFactory } from 'ims-core';
import { PeerInfoFactoryImpl } from './peer_info';
@NgModule({
  providers: [
    {
      provide: PeerInfoFactory,
      useClass: PeerInfoFactoryImpl,
      deps: [],
    },
  ],
})
export class PeerInfoModule {}
