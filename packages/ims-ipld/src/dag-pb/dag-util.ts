import { Injectable } from 'ims-core';
import dagPB = require('ipld-dag-pb');
import { DAGNode } from './dag-node';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return dagPB.util;
  },
  deps: [],
})
export abstract class DAGUtil {
  abstract serialize(
    node: DAGNode,
    callback: (err: Error, data: any) => void,
  ): void;
  abstract deserialize(
    buffer: Buffer,
    callback: (err: Error, data: any) => void,
  ): void;
  abstract cid(
    dagNode: DAGNode,
    options: { version: 0 | 1; hashAlg: string },
    callback: (err: Error, buf: Buffer) => void,
  ): void;
}
