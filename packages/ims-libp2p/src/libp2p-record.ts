import { Injectable } from 'ims-core';
const record = require('libp2p-record');
@Injectable({
  providedIn: 'root',
  useValue: record,
})
export class ImsLibp2pRecord {}
