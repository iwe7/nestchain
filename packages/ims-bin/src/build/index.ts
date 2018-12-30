import { Command, Action, Option } from 'ims-cli';
import getWebapckDll from 'ims-webpack-manifest';
import { ROOT } from 'ims-const';
import path = require('path');
import { handlerError } from 'ims-webpack-util';
import webpack = require('webpack');
import 'reflect-metadata';
import { gulp } from 'ims-gulp';

@Command({
  name: 'build',
  alias: 'build',
})
export class BuildCommand {
  @Option({
    flags: 't',
  })
  type: string;

  @Option({
    flags: 'n',
  })
  name: string;

  @Option({
    flags: 'p',
  })
  platform: string;

  // 根目录
  root: string = path.join(ROOT, 'www/public');

  @Action()
  add() {
    this.platform = this.platform || 'web';
    switch (this.type) {
      case 'dll':
        let cfg = getWebapckDll(this.root, this.platform);
        webpack(cfg).run(handlerError());
        break;
      case 'package':
        gulp(path.join(ROOT, 'packages'), path.join(ROOT, 'www/framework'))(
          false,
        );
        break;
      default:
        console.log(`add ${this.type}`);
    }
  }
}
