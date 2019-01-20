const multistream = require('multistream-select')
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
  useValue: multistream,
})
export class ImsMultistreamSelect {}
