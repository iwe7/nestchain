import { Injectable } from 'ims-core';
import dagPB = require('ipld-dag-pb');
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return dagPB.DAGLink;
  },
  deps: [],
})
export abstract class DAGLink {
  abstract get name(): string;
  abstract get nameAsBuffer(): Buffer;
  abstract get size(): string;
  abstract get cid(): any;
  constructor(name, size, cid) {}
  abstract toString(): string;
  abstract toJSON(): { name: string; size: string; cid: any };
  static create: (
    name: string,
    size: string,
    cid: any,
    callback: (err: Error, link: DAGLink) => void,
  ) => void;
  static util: DAGLinkUtil;
  static isDAGLink: (val: any) => val is DAGLink;
}

export abstract class DAGLinkUtil {
  abstract createDagLinkFromB58EncodedHash(link: any): DAGLink;
}
