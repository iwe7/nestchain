import ethereum = require('ipld-ethereum');
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
  useValue: ethereum,
})
export class ImsIpldEthereum {}
