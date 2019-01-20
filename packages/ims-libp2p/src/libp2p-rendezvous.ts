import { Injectable } from 'ims-core';
const rendezvous = require('libp2p-rendezvous');
@Injectable({
  providedIn: 'root',
  useValue: rendezvous,
})
export class ImsLibp2pRendezvous {}
