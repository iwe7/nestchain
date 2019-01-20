import { Injectable } from 'ims-core';
const SPDY = require('libp2p-spdy');
@Injectable({
  providedIn: 'root',
  useValue: SPDY,
})
export class ImsLibp2pSpdy {}
