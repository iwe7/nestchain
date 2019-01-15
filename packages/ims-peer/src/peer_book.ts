import { Injectable, PeerBook as CorePeerBook } from 'ims-core';
import peerBook = require('peer-book');
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return new peerBook();
  },
})
export abstract class PeerBook extends CorePeerBook {}
