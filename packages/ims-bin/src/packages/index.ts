import { ImsBinBase } from '../base';
import { doPackages } from 'ims-gulp';

export class PackagesCommand extends ImsBinBase {
  match(s: string, ...args: any[]) {
    if (s === 'packages') {
      // args.forEach(it => {
      //   Object.keys(it).forEach(key => {
      //     let val = it[key];
      //     if (key === 'name' || key === 'n') {
      //       this.name = val;
      //     }
      //   });
      // });
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
    return doPackages()
  }
}
