const multibase = require('multibase');
import { Injectable } from 'ims-core';
@Injectable({
  providedIn: 'root',
  useValue: multibase,
})
export class ImsMultibase {}
