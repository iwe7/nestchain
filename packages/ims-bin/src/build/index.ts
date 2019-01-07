import getWebapckDll from 'ims-webpack-manifest';
import { ROOT } from 'ims-const';
import path = require('path');
import { handlerError } from 'ims-webpack-util';
import webpack = require('webpack');
import { gulp } from 'ims-gulp';
import { ImsBinBase } from '../base';

export class BuildCommand extends ImsBinBase {
  type: string;
  name: string;
  platform: string;
  // 根目录
  root: string = path.join(ROOT, 'www/public');

  match(s: string, ...args: any[]) {
    if (s === 'build' || s === 'b') {
      args.forEach(it => {
        Object.keys(it).forEach(key => {
          let val = it[key];
          key = key + '';
          if (key === 'p' || key === 'platform') {
            this.platform = val;
          } else if (key === 'n' || key === 'name') {
            this.name = val;
          } else if (key === 't' || key === 'type') {
            this.type = val;
          }
        });
      });
      return true;
    }
    return false;
  }

  run() {
    console.log(this.type);
    this.platform = this.platform || 'web';
    switch (this.type) {
      case 'dll':
        let cfg = getWebapckDll(this.root, this.platform);
        webpack(cfg).run(handlerError());
        break;
      case 'package':
        return gulp(
          path.join(ROOT, 'packages'),
          path.join(ROOT, 'www/framework'),
        )(false).toPromise();
      default:
        throw new Error(`can't find ${this.type}`);
    }
  }
}
