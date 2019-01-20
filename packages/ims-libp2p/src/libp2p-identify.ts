import { Injectable } from 'ims-core';
const identify = require('libp2p-identify');
@Injectable({
  providedIn: 'root',
  useValue: identify,
})
export class ImsLibp2pIdentify {}
