import { Injectable } from 'ims-core';
const PeerInfo = require('peer-info');
@Injectable({
  providedIn: 'root',
  useValue: PeerInfo,
})
export class ImsPeerInfo {}
