import { Injectable } from 'ims-core';
const DHT = require('libp2p-kad-dht')
@Injectable({
  providedIn: 'root',
  useValue: DHT,
})
export class ImsLibp2pKadDht {}
