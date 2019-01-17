/**
 * 默克尔树
 */

import { Multihashing } from 'ims-multihash';
import { Injectable } from 'ims-core';
export class ImsMerkleTree {
  root: Buffer;
  rootNode: ImsMerkleTreeNode;
  get hash() {
    return this.root.toString('hex');
  }
  constructor(
    datas: Buffer[],
    public multihashing: Multihashing,
    public other: any,
  ) {
    if (datas.length <= 0) {
      datas = [Buffer.from('')];
    }
    if (datas.length === 1) {
      this.rootNode = new ImsMerkleTreeNode(
        datas[0],
        0,
        this.multihashing,
        this.other,
      );
      this.root = this.rootNode.hash;
    } else {
      let nodes = datas.map(
        (data, index) =>
          new ImsMerkleTreeNode(data, index, this.multihashing, this.other),
      );
      this.handlerNodes(nodes.reverse());
    }
  }

  toJson(): MerkleJson {
    return {
      ...this.other,
      ...this.rootNode.toJson(),
    };
  }

  private handlerNodes(nodes: ImsMerkleTreeNode[]) {
    let last = nodes.pop();
    let old = last;
    let newNodes = [];
    while (last) {
      old = last;
      last = nodes.pop();
      if (last) {
        let node = (last.parent = old.parent = new ImsMerkleTreeNode(
          Buffer.from(old.hash.toString() + last.hash.toString()),
          old.key + '_' + last.key,
          this.multihashing,
          this.other,
        ));
        node.left = old;
        node.right = last;
        newNodes.push(node);
        last = nodes.pop();
      } else {
        newNodes.push(old);
      }
    }
    if (newNodes.length > 1) {
      this.handlerNodes(newNodes.reverse());
    } else if (newNodes.length === 1) {
      this.rootNode = newNodes[0];
      this.root = this.rootNode.hash;
    }
  }
}

/**
 * 默克尔树节点
 */
export class ImsMerkleTreeNode {
  /**
   * 是否是叶子
   */
  get hash(): Buffer {
    return this.multihashing.hash(this.data);
  }
  parent: ImsMerkleTreeNode;

  left: ImsMerkleTreeNode;
  right: ImsMerkleTreeNode;

  constructor(
    public data: Buffer,
    private _key: any,
    public multihashing: Multihashing,
    public other: any,
  ) {}

  toJson(): MerkleJson {
    let item: any = {
      hash: this.hash.toString('hex'),
    };
    if (this.left) {
      item.left = this.left.toJson();
    }
    if (this.right) {
      item.right = this.right.toJson();
    }
    return { ...item, ...this.other };
  }

  get key() {
    return `${this._key}`;
  }
}

export interface MerkleJson {
  hash: string;
  left?: MerkleJson;
  right?: MerkleJson;
}

/**
 * 默克尔树工厂
 */
@Injectable({
  providedIn: 'root',
})
export class ImsMerkleTreeFactory {
  constructor(public multihashing: Multihashing) {}
  create(
    datas: Buffer[] | { [key: string]: Buffer },
    other?: any,
  ): ImsMerkleTree {
    let items = Object.keys(datas).map(it => datas[it]);
    return new ImsMerkleTree(items, this.multihashing, other);
  }
}
