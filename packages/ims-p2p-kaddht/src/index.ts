import { NgModule } from 'ims-core';
import { KadDht } from './kad_dht';
import { Providers } from './providers';
import { RandomWalk } from './random-walk';
import { Network } from './network';
import { RoutingTable } from './routing';

@NgModule({
  providers: [KadDht, Providers, RandomWalk, Network, RoutingTable],
})
export class ImsP2pKadDhtModule {}
