import { Injectable } from 'ims-core';
const TCP = require('libp2p-tcp');

@Injectable({
  providedIn: 'root',
  useValue: TCP,
})
export class ImsLibp2pTcp {}
