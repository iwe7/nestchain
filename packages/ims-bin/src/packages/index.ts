import { gulpPackages } from 'ims-gulp';
import { ImsBinBase } from '../base';

export class PackagesCommand extends ImsBinBase {
  name: string;
  match(s: string, ...args: any[]) {
    if (s === 'packages' || s === 'p') {
      args.forEach(it => {
        Object.keys(it).forEach(key => {
          let val = it[key];
          if (key === 'name' || key === 'n') {
            this.name = val;
          }
        });
      });
      return true;
    }
    return false;
  }
  run() {
    if (this.name) {
      return gulpPackages(this.name);
    }
  }
}
