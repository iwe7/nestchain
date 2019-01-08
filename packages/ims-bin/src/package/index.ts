import { ImsBinBase } from '../base';
import { gulpPackages } from 'ims-gulp';

export class PackageCommand extends ImsBinBase {
  name: string;
  match(s: string, ...args: any[]) {
    if (s === 'package') {
      args.forEach(it => {
        Object.keys(it).map(key => {
          let val = it[key];
          if (key === 'n' || key === 'name') {
            this.name = val;
          }
        });
      });
      return true;
    }
    return false;
  }
  run() {
    return gulpPackages(this.name);
  }
}
