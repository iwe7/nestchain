import { Injectable } from 'ims-core';
import IPFSRepo = require('ipfs-repo');

@Injectable({
  providedIn: 'root',
})
export class RepoFactory {
  create(dir: string) {
    const repoPath = dir || 'ipfs';
    return new IPFSRepo(repoPath);
  }
}
