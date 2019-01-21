import IpfsRepo = require('ipfs-repo');
import * as tokens from '../../tokens/index';
import { ImsPromise } from 'ims-util';
let BaseRepo: tokens.Repo = IpfsRepo;
export class Repo extends BaseRepo implements tokens.Repo {
  open() {
    let imsPromise = new ImsPromise<void>();
    if (this.closed) {
      imsPromise.next();
    }
    super.open((err, res) => {
      if (err) return imsPromise.error(err);
      imsPromise.next();
    });
    return imsPromise.promise;
  }
}
