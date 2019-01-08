import { ImsBinBase } from '../base';
import { doPackages } from 'ims-gulp';

export class PackagesCommand extends ImsBinBase {
  match(s: string, ...args: any[]) {
    if (s === 'packages') {
      return true;
    }
    return false;
  }
  run() {
    console.log(`
/**
 * packages command
 **/
    `);
    return doPackages();
  }
}
