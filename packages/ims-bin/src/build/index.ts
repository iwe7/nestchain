import getWebapckDll from 'ims-webpack-manifest';
import { ROOT } from 'ims-const';
import path = require('path');
import { handlerError } from 'ims-webpack-util';
import webpack = require('webpack');
import 'reflect-metadata';
import { gulp } from 'ims-gulp';
import { fromCallback } from 'ims-rxjs';

import { ImsBinBase } from '../base';
import { Observable } from 'rxjs';

export class BuildCommand extends ImsBinBase {
  type: string;
  name: string;
  platform: string;
  // 根目录
  root: string = path.join(ROOT, 'www/public');

  match(s: string, ...args: any[]) {
    args.forEach((it, key) => {
      if (key + '' === 'p' || key + '' === 'platform') {
        this.platform = it;
      }
      if (key + '' === 'n' || key + '' === 'name') {
        this.name = it;
      }
      if (key + '' === 't' || key + '' === 'type') {
        this.type = it;
      }
    });
    return s === 'b' || s === 'build';
  }

  run() {
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
        console.log(`add ${this.type}`);
    }
  }
}
