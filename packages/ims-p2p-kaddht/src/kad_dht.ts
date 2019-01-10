import { Injectable } from 'ims-core';
import { RandomWalk } from './random-walk';
import { Network } from './network';
import { Providers } from './providers';
import { RoutingTable } from './routing';

@Injectable()
export class KadDht {
  constructor(
    public randomWalk: RandomWalk,
    public network: Network,
    public providers: Providers,
    public routingTable: RoutingTable,
  ) {}
}
