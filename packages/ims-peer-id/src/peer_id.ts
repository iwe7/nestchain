import { Injectable, PeerIdFactory, PeerId, PeerIdJson } from 'ims-core';
import peerId = require('peer-id');

@Injectable()
export class PeerIdFactoryImpl extends PeerIdFactory {
  create(opts: any): Promise<PeerId> {
    return new Promise((resolve, reject) => {
      peerId.create(opts, (err, id: any) => {
        if (err) reject(err);
        else resolve(id);
      });
    });
  }
  createFromHexString(str: string): PeerId {
    return peerId.createFromHexString(str) as any;
  }
  createFromBytes(buf: Buffer): PeerId {
    return peerId.createFromBytes(buf) as any;
  }
  createFromB58String(str: string): PeerId {
    return peerId.createFromB58String(str) as any;
  }
  createFromPubKey(key: any): Promise<PeerId> {
    return new Promise((resolve, reject) => {
      peerId.createFromPubKey(key, (err, id: any) => {
        if (err) reject(err);
        else resolve(id);
      });
    });
  }
  createFromPrivKey(key: any): Promise<PeerId> {
    return new Promise((resolve, reject) => {
      peerId.createFromPrivKey(key, (err, id: any) => {
        if (err) reject(err);
        else resolve(id);
      });
    });
  }
  createFromJSON(cfg: PeerIdJson): Promise<PeerId> {
    return new Promise((resolve, reject) => {
      peerId.createFromJSON(cfg, (err, id: any) => {
        if (err) reject(err);
        else resolve(id);
      });
    });
  }
  isPeerId(id: any): id is PeerId {
    return typeof id === 'object' && id._id && id._idB58String;
  }
  isEqual(a, b): boolean {
    return a === b;
  }
}
