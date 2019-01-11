import { NgModule } from 'ims-core';
import { PeerIdModule } from 'ims-peer-id';
import { PeerInfoModule } from 'ims-peer-info';

import { P2p } from './p2p';
import { P2pNodeFactory } from './p2p_node';
@NgModule({
  providers: [P2p, P2pNodeFactory],
  imports: [PeerIdModule, PeerInfoModule],
})
export class P2pModule {}
