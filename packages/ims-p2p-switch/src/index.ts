import { NgModule } from 'ims-core';
import { ConnectionManager } from './connection';
import { TransportManager } from './transport';
import { P2pSwitch } from './switch';
@NgModule({
  providers: [ConnectionManager, TransportManager, P2pSwitch],
})
export class P2pSwitchModule {}
