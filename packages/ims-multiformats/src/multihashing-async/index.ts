const multihashing = require('multihashing-async');
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
  useValue: multihashing,
})
export class ImsMultihashingAsync {}
