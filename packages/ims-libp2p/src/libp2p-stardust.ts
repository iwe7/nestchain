import { Injectable } from 'ims-core';
const Stardust = require('libp2p-stardust');
@Injectable({
  providedIn: 'root',
  useValue: Stardust,
})
export class ImsLibp2pStardust {}
