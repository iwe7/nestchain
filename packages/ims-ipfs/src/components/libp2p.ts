import { Injectable } from 'ims-core';

@Injectable()
export class Libp2p {
  constructor(public libp2pNode: Libp2pNode) {}
  start() {}
  stop() {}
}

@Injectable()
export class Libp2pNode {}
