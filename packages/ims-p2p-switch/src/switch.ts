import { Injectable } from 'ims-core';
import { ConnectionManager } from './connection';
import { TransportManager } from './transport';

@Injectable()
export class P2pSwitch {
  constructor(
    public connection: ConnectionManager,
    public transport: TransportManager,
  ) {}
}
