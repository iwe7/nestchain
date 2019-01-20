import { Injectable } from 'ims-core';
const MulticastDNS = require('libp2p-mdns')
@Injectable({
  providedIn: 'root',
  useValue: MulticastDNS,
})
export class ImsLibp2pMdns {}
