import { Injectable } from 'ims-core';
const libp2p = require('libp2p');

@Injectable({
  providedIn: 'root',
  useValue: libp2p,
})
export class ImsLibp2p {}
