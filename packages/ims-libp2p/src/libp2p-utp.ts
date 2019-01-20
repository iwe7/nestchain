import { Injectable } from 'ims-core';
const utp = require('libp2p-utp');

@Injectable({
  providedIn: 'root',
  useValue: utp,
})
export class ImsLibp2pUtp {}
