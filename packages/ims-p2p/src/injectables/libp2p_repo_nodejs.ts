import os = require('os');
import IPFSRepo = require('ipfs-repo');
import path = require('path');
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class Libp2pRepoNodejs {
  create(dir: string) {
    const repoPath = dir || path.join(os.homedir(), '.jsipfs');
    return new IPFSRepo(repoPath);
  }
}
