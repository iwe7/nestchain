import { clean } from 'ims-gulp';
import { ImsBinBase } from '../base';

export class CleanCommand extends ImsBinBase {
  name: string;
  match(s: string, ...args: any[]) {
    if (s === 'clean') {
      return true;
    }
    return false;
  }
  run() {
    console.log(`
    /**
     * clean command
     **/
        `);
    return clean();
  }
}
