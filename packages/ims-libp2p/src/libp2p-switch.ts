import { Injectable } from 'ims-core';
const Switch = require('libp2p-switch');
@Injectable({
  providedIn: 'root',
  useValue: Switch,
})
export class ImsLibp2pSwitch {}
