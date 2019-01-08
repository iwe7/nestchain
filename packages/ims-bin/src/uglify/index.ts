import { _uglify } from 'ims-gulp';
import { ImsBinBase } from '../base';

export class UglifyCommand extends ImsBinBase {
  name: string;
  match(s: string, ...args: any[]) {
    if (s === 'uglify') {
      return true;
    }
    return false;
  }
  run() {
    console.log(`
    /**
     * uglify command
     **/
        `);
    return _uglify();
  }
}
