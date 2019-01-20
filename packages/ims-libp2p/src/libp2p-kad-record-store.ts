import { Injectable } from 'ims-core';
const store = require('libp2p-kad-record-store');
@Injectable({
  providedIn: 'root',
  useValue: store,
})
export class ImsLibp2pKadRecordStore {}
