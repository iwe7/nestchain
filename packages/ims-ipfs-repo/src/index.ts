import { IpfsRepoFactory, Injector } from 'ims-core';
import ipfsRepo = require('ipfs-repo');
export class IpfsRepoFactoryImpl extends IpfsRepoFactory {
  constructor(public injector: Injector) {
    super();
  }
  create(path: string) {
    return new ipfsRepo(path);
  }
}
