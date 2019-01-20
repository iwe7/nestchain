import { Injectable } from 'ims-core';
const floodsub = require('libp2p-floodsub');
@Injectable({
  providedIn: 'root',
  useValue: floodsub,
})
export class ImsLibp2pFloodsub {}
