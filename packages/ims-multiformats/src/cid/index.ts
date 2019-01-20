import { Injectable } from 'ims-core';
const CID = require('cids');
@Injectable({
  providedIn: 'root',
  useValue: CID,
})
export class ImsCid {}
