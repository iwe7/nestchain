import { Injectable } from 'ims-core';
const SECIO = require('libp2p-secio')
@Injectable({
  providedIn: 'root',
  useValue: SECIO,
})
export class ImsLibp2pSecio {}
