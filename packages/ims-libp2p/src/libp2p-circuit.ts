import { Injectable } from 'ims-core';
const circuit = require('libp2p-circuit');
@Injectable({
  providedIn: 'root',
  useValue: circuit,
})
export class ImsLibp2pCircuit {}
