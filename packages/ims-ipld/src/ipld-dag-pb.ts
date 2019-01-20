import { Injectable } from 'ims-core';
const dagPB = require('ipld-dag-pb');

@Injectable({
  providedIn: 'root',
  useValue: dagPB,
})
export class ImsIpldDagPb {}
