import { Injectable, Injector, InjectionToken } from 'ims-core';
import GraphBuilder = require('ipld-graph-builder');
import { IpfsDag } from 'ims-ipfs';

@Injectable({
  providedIn: 'root',
  useFactory: (injector: Injector) => {
    let dag = injector.get(IpfsDag);
    if (!dag) {
      throw new Error(`dag must ipfs.dag instance`);
    }
    return new GraphBuilder(dag);
  },
  deps: [Injector],
})
export abstract class Graph {
  abstract findUnsavedLeafNodes(): any;
  abstract async set(): Promise<any>;
  abstract async get(): Promise<any>;
  abstract async tree(): Promise<any>;
}
