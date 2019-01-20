const multihashing = require('multihashing');
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
  useValue: multihashing,
})
export class ImsMultihashing {}
