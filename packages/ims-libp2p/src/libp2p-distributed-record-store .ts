import { Injectable } from 'ims-core';
const DistributedRecordStore = require('libp2p-distributed-record-store ')
@Injectable({
  providedIn: 'root',
  useValue: DistributedRecordStore,
})
export class ImsLibp2pDistributedRecordStore {}
