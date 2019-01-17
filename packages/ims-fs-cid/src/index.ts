import { Injectable, Injector, SourceRoot } from 'ims-core';
import { ROOT } from 'ims-const';
import { ImsMerkleTreeFactory, ImsMerkleTree, MerkleJson } from 'ims-merkle';
import { ImsDirTreeFactory, ImsDirTree } from 'ims-dir-tree';
import * as fs from 'fs';
import * as path from 'path';
import { from } from 'rxjs';
import { forkJoin } from 'ims-rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImsFsCid {
  root: string;
  dirTree: ImsDirTree;
  constructor(
    private injector: Injector,
    public merkleFactory: ImsMerkleTreeFactory,
    public dirTreeFactory: ImsDirTreeFactory,
  ) {
    this.root = this.injector.get(SourceRoot, ROOT);
    this.dirTree = this.dirTreeFactory.create(this.root);
  }
  async getDirHash(dir: string): Promise<MerkleJson> {
    try {
      let stats = fs.statSync(dir);
      let hash: MerkleJson;
      if (stats.isDirectory()) {
        hash = await this.createMerkle(dir, true);
      } else {
        hash = await this.createMerkle(dir, false);
      }
      return hash;
    } catch (e) {
      throw e;
    }
  }
  watch() {}
  async createMerkle(dir: string, isDir: boolean): Promise<MerkleJson> {
    let datas: Buffer[] = [];
    if (isDir) {
      let dirs = await this.list(dir);
      dirs.forEach(d => {
        if (d.merkle) {
          datas.push(Buffer.from(d.merkle.hash));
        }
      });
    } else {
      datas = await this.createBlock(dir);
    }
    if (datas.length > 0) {
      return this.merkleFactory.create(datas).toJson();
    }
  }
  async createBlock(dir: string): Promise<Buffer[]> {
    return new Promise<Buffer[]>((resolve, reject) => {
      try {
        let datas: Buffer[] = [];
        let stream = fs.createReadStream(dir);
        stream.on('data', chunk => {
          datas.push(chunk);
        });
        stream.on('close', () => {
          resolve(datas);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  async stat(filePath: string): Promise<any> {
    let stats: IStats = fs.statSync(filePath);
    let hash: MerkleJson;
    if (stats.isDirectory()) {
      hash = await this.createMerkle(filePath, true);
    } else {
      hash = await this.createMerkle(filePath, false);
    }
    if (hash) {
      stats.merkle = hash;
    }
    stats.path = filePath;
    return stats;
  }
  async list(pathName?: string) {
    pathName = pathName || this.root;
    let results: IStats[] = [];
    let files: string[] = fs.readdirSync(pathName);
    if (files && files.length > 0) {
      let obs = [];
      files.forEach(file => {
        let filePath = path.join(pathName, file);
        obs.push(
          from(
            this.stat(filePath).then((res: IStats) => {
              results.push(res);
            }),
          ),
        );
      });
      if (obs.length > 0) {
        await forkJoin(...obs).toPromise();
      }
    }
    return results;
  }
}

export type IStats = fs.Stats & { merkle?: any; path?: string };
