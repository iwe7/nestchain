import { Injectable } from 'ims-core';
const DelegatedPeerRouter = require('libp2p-delegated-peer-routing')
@Injectable({
  providedIn: 'root',
  useValue: DelegatedPeerRouter,
})
export class ImsLibp2pDelegatedPeerRouting {}
