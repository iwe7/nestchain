import { Injectable } from 'ims-core';
const PeerBook = require('peer-book');
@Injectable({
  providedIn: 'root',
  useValue: PeerBook,
})
export class ImsPeerBook {}
