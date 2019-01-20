import { Injectable } from 'ims-core';
const routing = require('libp2p-kad-routing');
@Injectable({
  providedIn: 'root',
  useValue: routing,
})
export class ImsLibp2pKadRouting {}
