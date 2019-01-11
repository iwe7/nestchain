import { NgModule, PeerIdFactory } from 'ims-core';
import { PeerIdFactoryImpl } from './peer_id';
@NgModule({
  providers: [
    {
      provide: PeerIdFactory,
      useClass: PeerIdFactoryImpl,
      deps: [],
    },
  ],
})
export class PeerIdModule {}
