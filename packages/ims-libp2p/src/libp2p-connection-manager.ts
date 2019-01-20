import { Injectable } from 'ims-core';
const connectionManager = require('libp2p-connection-manager');
@Injectable({
  providedIn: 'root',
  useValue: connectionManager,
})
export class ImsLibp2pConnectionManager {}
