import { Injectable } from 'ims-core';
import IPFSRepo = require('ipfs-repo');

@Injectable({
  providedIn: 'root',
})
export class Libp2pRepoBrowser {
  create(dir: string) {
    const repoPath = dir || 'ipfs';
    return new IPFSRepo(repoPath);
  }
}
