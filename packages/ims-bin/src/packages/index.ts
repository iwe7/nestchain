import { ROOT } from 'ims-const';
import path = require('path');
import { gulp } from 'ims-gulp';
import { ImsBinBase } from '../base';

export class PackagesCommand extends ImsBinBase {
  root: string = path.join(ROOT, 'www/public');
  match(s: string, ...args: any[]) {
    return s === 'packages' || s === 'p';
  }
  run() {
    return gulp(path.join(ROOT, 'packages'), path.join(ROOT, 'www/framework'))(
      false,
    ).toPromise();
  }
}
