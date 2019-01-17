import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NgModule } from 'ims-core';
import { from } from 'ims-rxjs';
import { forkJoin } from 'rxjs';
import {
  ImsMerkleTreeFactory,
  ImsMerkleTree,
  MerkleJson,
  ImsMerkleTreeNode,
} from 'ims-merkle';
import { MultihashModule } from 'ims-multihash';

@NgModule({
  imports: [MultihashModule],
})
export class ImsDirTreeModule {}

@Injectable({
  providedIn: 'root',
})
export class ImsDirTreeFactory {
  constructor(public merkleFac: ImsMerkleTreeFactory) {}
  async create(p: string) {
    let tree = new ImsDirTree(p, this.merkleFac);
    await tree.init();
    return tree;
  }
}

function isImsDirTree(val: any): val is ImsDirTree {
  return val.type === 'dir';
}
function isImsDirTreeFile(val: any): val is ImsDirTreeFile {
  return val.type === 'file';
}
export class ImsDirTree {
  type: string = 'dir';
  /**
   * 文件或目录
   */
  children: (ImsDirTreeFile | ImsDirTree)[] = [];
  constructor(public base: string, public merkleFac: ImsMerkleTreeFactory) {}

  hasChild(name: string) {
    return !!this._getChild(name);
  }

  private _getChild(name: string) {
    let res: ImsDirTreeFile | ImsDirTree;
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i];
      if (isImsDirTree(child)) {
        if (name === child.base) {
          res = child;
        }
      } else if (isImsDirTreeFile(child)) {
        if (name === child.path) {
          res = child;
        }
      }
    }
    if (res) return res;
  }

  toJson() {
    let hash = this.getHash();
    return hash.toJson();
  }

  getNodes(): string[] {
    this.nodes = [];
    let hash = this.getHash();
    let node = hash.rootNode;
    if (node.left) {
      this.getLeafLeftNode(node.left);
    }
    if (node.right) {
      this.getLeafRightNode(node.right);
    }
    return this.nodes.map(node => node.hash.toString('hex'));
  }
  private nodes: ImsMerkleTreeNode[] = [];
  private getLeafLeftNode(node: ImsMerkleTreeNode) {
    if (node.right) {
      this.getLeafRightNode(node.right);
    }
    while (node.left) {
      node = node.left;
    }
    this.nodes.push(node);
  }

  private getLeafRightNode(node: ImsMerkleTreeNode) {
    if (node.left) {
      this.getLeafLeftNode(node.left);
    }
    while (node.right) {
      node = node.right;
    }
    this.nodes.push(node);
  }

  getChild(name: string) {
    name = name.includes(this.base) ? name : path.join(this.base, name);
    let res = this._getChild(name);
    if (!res) {
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        if (isImsDirTree(child)) {
          let _dir = child.getChild(name);
          if (_dir) {
            res = _dir;
          }
        }
      }
    }
    return res;
  }

  getHash(): ImsMerkleTree {
    let buffs = this.children
      .filter(child => !!child.getHash())
      .map(child => {
        return child.getHash().root;
      });
    if (buffs.length > 0)
      return this.merkleFac.create(buffs, {
        base: this.base,
      });
  }

  async init() {
    let files: string[] = fs.readdirSync(this.base);
    if (files && files.length > 0) {
      let obs = [];
      this.children = files.map(file => {
        let res: ImsDirTree | ImsDirTreeFile;
        let filePath = path.join(this.base, file);
        let stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          let filePath = path.join(this.base, file);
          res = new ImsDirTree(filePath, this.merkleFac);
        } else {
          res = new ImsDirTreeFile(this.base, file, this.merkleFac);
        }
        obs.push(from(res.init()));
        return res;
      });
      await forkJoin(...obs).toPromise();
    }
  }

  /**
   * 新建文件夹
   * @param name
   * @param options
   */
  async mkdir(
    name: string,
    options?: number | string | fs.MakeDirectoryOptions | null,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.mkdir(path.join(this.base, name), options, (err: any) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  async exists(name: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      return fs.exists(path.join(this.base, name), (exsit: boolean) => {
        resolve(exsit);
      });
    });
  }

  async existsDir(name: string): Promise<boolean> {
    let exist = await this.exists(name);
    if (exist) {
      return true;
    }
    return await this.exists(path.dirname(path.join(this.base, name)));
  }

  /**
   * 写入文件
   * @param name
   * @param buf
   */
  async writeFile(name: string, buf: Buffer) {
    if (await this.existsDir(name)) {
      await writeFile(path.join(this.base, name), buf);
    }
  }
}

function writeFile(path: string, buf: Buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, buf, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

/**
 * 文件
 */
export class ImsDirTreeFile {
  type: string = 'file';
  /**
   * 目录
   */
  parent: ImsDirTree;
  /**
   * 数据块
   */
  children: ImsDirTreeData[] = [];
  path: string;

  getHash(): ImsMerkleTree {
    let buffs = this.children.map(child => child.data);
    if (buffs.length > 0) {
      return this.merkleFac.create(buffs, {
        base: this.base,
        name: this.name,
      });
    }
  }
  constructor(
    public base: string,
    public name: string,
    public merkleFac: ImsMerkleTreeFactory,
  ) {}

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.children = [];
        this.path = path.join(this.base, this.name);
        let stream = fs.createReadStream(this.path);
        stream.on('open', cd => {});
        stream.on('data', chunk => {
          this.children.push(new ImsDirTreeData(chunk, this.merkleFac));
        });
        stream.on('close', () => {
          stream.removeAllListeners();
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

/**
 * 分块
 */
export class ImsDirTreeData {
  constructor(public data: Buffer, public merkle: ImsMerkleTreeFactory) {}
  get hash() {
    return this.merkle.create([this.data]);
  }
}
