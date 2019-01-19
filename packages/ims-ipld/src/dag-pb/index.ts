import { Injectable } from 'ims-core';
import { DAGLink } from './dag-link';
import { DAGNode } from './dag-node';
import { DAGUtil } from './dag-util';
import { DAGResolver } from './dag-resolver';
@Injectable({
  providedIn: 'root',
})
export class DagPb {
  constructor(
    public DAGNode: DAGNode,
    public DAGLink: DAGLink,
    public util: DAGUtil,
    public resolver: DAGResolver,
  ) {}
}
