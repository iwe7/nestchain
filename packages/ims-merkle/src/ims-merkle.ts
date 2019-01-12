/**
 * 默克尔树
 */
export class ImsMerkleTree {
  constructor(datas: Buffer[]) {
    let nodes = datas.map(data => new ImsMerkleTreeNode(data));
  }
  insert() {}
}

/**
 * 默克尔树节点
 */
export class ImsMerkleTreeNode {
  /**
   * 是否是叶子
   */
  isLeaf: boolean;
  constructor(public data: Buffer) {}

  insert() {}
  find() {}
  contains() {}
  remove() {}
  findMin() {}
}

/**
 * 默克尔树工厂
 */
export class ImsMerkleTreeFactory {
  create(datas: Buffer[]): ImsMerkleTree {
    return new ImsMerkleTree(datas);
  }
}
