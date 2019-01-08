import { ImsBinBase } from '../base';
import { gulpWeixin } from 'ims-gulp';

export class WxappCommand extends ImsBinBase {
  match(s: string, ...args: any[]) {
    if (s === 'wxapp') {
      return true;
    }
    return false;
  }
  run() {
    console.log(`
/**
 * wxapp command
 **/
    `);
    return gulpWeixin();
  }
}
