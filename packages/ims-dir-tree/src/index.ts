import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from 'ims-core';
import { from } from 'ims-rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImsDirTreeFactory {
  async create(p: string) {
    let tree = new ImsDirTree(p);
    await tree.init();
    return tree;
  }
}

export class ImsDirTree {
  /**
   * 文件或目录
   */
  children: (ImsDirTreeFile | ImsDirTree)[] = [];
  constructor(public base: string) {}

  async init() {
    let files: string[] = fs.readdirSync(this.base);
    if (files && files.length > 0) {
      let obs = [];
      this.children = files.map(file => {
        let res: ImsDirTree | ImsDirTreeFile;
        let filePath = path.join(this.base, file);
        let stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          res = new ImsDirTree(filePath);
        } else {
          res = new ImsDirTreeFile(this.base, file);
        }
        obs.push(from(res.init()));
        return res;
      });
      await forkJoin(...obs).toPromise();
    }
  }
}

/**
 * 文件
 */
export class ImsDirTreeFile {
  /**
   * 目录
   */
  parent: ImsDirTree;
  /**
   * 数据块
   */
  children: ImsDirTreeData[] = [];
  path: string;
  constructor(public base: string, public name: string) {}
  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.path = path.join(this.base, this.name);
        let stream = fs.createReadStream(this.path);
        stream.on('open', cd => {});
        stream.on('data', chunk => {
          this.children.push(new ImsDirTreeData(chunk));
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
  constructor(public data: Buffer) {}
}
