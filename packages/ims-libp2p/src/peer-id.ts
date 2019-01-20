import { Injectable } from 'ims-core';
const PeerId = require('peer-id');
@Injectable({
  providedIn: 'root',
  useValue: PeerId,
})
export class ImsPeerId {}
