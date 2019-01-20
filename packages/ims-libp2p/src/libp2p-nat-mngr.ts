import { Injectable } from 'ims-core';
const natMngr = require('libp2p-nat-mngr');
@Injectable({
  providedIn: 'root',
  useValue: natMngr,
})
export class ImsLibp2pNatMngr {}
