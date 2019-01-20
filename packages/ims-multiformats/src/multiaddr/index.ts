import { Injectable } from 'ims-core';
const multiaddr = require('multiaddr');
@Injectable({
  providedIn: 'root',
  useValue: multiaddr,
})
export class ImsMultiaddr {}
