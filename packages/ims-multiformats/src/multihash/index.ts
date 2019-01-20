const multihashes = require('multihashes');
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
  useValue: multihashes,
})
export class ImsMultihash {}
