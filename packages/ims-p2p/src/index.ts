import { NgModule } from 'ims-core';

import { P2p } from './p2p';
import { P2pNodeFactory } from './p2p_node';
@NgModule({
  providers: [P2p, P2pNodeFactory],
  imports: [],
})
export class P2pModule {}
