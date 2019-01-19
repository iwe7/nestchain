import { Injectable, Cid } from 'ims-core';
import dagPB = require('ipld-dag-pb');
import { DAGLink } from './dag-link';
@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return dagPB.DAGNode;
  },
  deps: [],
})
export abstract class DAGNode {
  abstract get data(): any;
  abstract get links(): any;
  abstract get size(): any;
  abstract toJSON(): {
    data: any;
    links: any[];
    size: any;
  };
  abstract toString(): string;

  static create: (
    data: any,
    links: DAGLink[],
    callback: (err: Error, node: DAGNode) => void,
  ) => void;
  static clone: (
    dagNode: DAGNode,
    callback: (err: Error, node: DAGNode) => void,
  ) => void;
  static addLink: (
    node: DAGNode,
    link: DAGLink,
    callback: (err: Error, node: DAGNode) => void,
  ) => void;
  static rmLink: (
    dagNode: DAGNode,
    nameOrCid: string | Cid,
    callback: (err: Error, node: DAGNode) => void,
  ) => void;

  static isDAGNode: (val: any) => val is DAGNode;
}
