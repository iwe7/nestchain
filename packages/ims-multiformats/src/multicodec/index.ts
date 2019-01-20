const multicodec = require('multicodec');
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
  useValue: multicodec,
})
export class ImsMulticodec {}
