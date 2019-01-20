import { Injectable } from 'ims-core';
const record = require('iprs-record');
@Injectable({
  providedIn: 'root',
  useValue: record,
})
export class ImsIprsRecord {}
