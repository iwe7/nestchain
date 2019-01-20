import { Injectable } from 'ims-core';
const MPLEX = require('libp2p-mplex')
@Injectable({
  providedIn: 'root',
  useValue: MPLEX,
})
export class ImsLibp2pMplex {}
