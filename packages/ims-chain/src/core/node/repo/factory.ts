import { Injectable, Injector } from 'ims-core';
import * as tokens from '../../tokens/index';
import os = require('os');
import path = require('path');

@Injectable({
  providedIn: 'root',
})
export class RepoFactory {
  constructor(public injector: Injector) {}
  async create(dir: string) {
    let Repo = await this.injector.get(tokens.Repo);
    const repoPath = dir || path.join(os.homedir(), '.jsipfs');
    let instance = new Repo(repoPath);
    return instance;
  }
}
