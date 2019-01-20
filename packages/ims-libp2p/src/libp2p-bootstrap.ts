import { Injectable } from 'ims-core';
const bootstrap = require('libp2p-bootstrap');
@Injectable({
  providedIn: 'root',
  useValue: bootstrap,
})
export class ImsLibp2pBootstrap {}
