import { Injectable } from 'ims-core';
import dagPB = require('ipld-dag-pb');

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    return dagPB.resolver;
  },
  deps: [],
})
export abstract class DAGResolver {
  multicodec: string = 'dag-pb';
  defaultHashAlg: string = 'sha2-256';
  abstract resolve(
    binaryBlob: Buffer,
    path: string,
    callback: (err: Error, data: any) => any,
  ): void;
  abstract tree(
    binaryBlob: Buffer,
    options: any,
    callback: (err: Error, data: any) => any,
  ): void;
  abstract isLink(
    binaryBlob: Buffer,
    path: string,
    callback: (err: Error, data: boolean) => any,
  ): void;
}
