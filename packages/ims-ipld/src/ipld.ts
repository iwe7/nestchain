import { Injectable } from 'ims-core';
const ipld = require('ipld');

@Injectable({
  providedIn: 'root',
  useValue: ipld
})
export class ImsIpld {}
