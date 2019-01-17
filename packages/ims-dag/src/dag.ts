import { DagBlock } from './block';
import { DagNode } from './node';

export class Dag {
  constructor(public block: DagBlock) {}

  put(node: DagNode): Promise<void> {
    return new Promise((resolve, reject) => {});
  }
}
