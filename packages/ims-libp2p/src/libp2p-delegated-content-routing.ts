import { Injectable } from 'ims-core';
const DelegatedContentRouter = require('libp2p-delegated-content-routing')
@Injectable({
  providedIn: 'root',
  useValue: DelegatedContentRouter,
})
export class ImsLibp2pDelegatedContentRouting {}
