import { Command, Action, Option } from 'ims-cli';
import getWebapckDll from 'ims-webpack-manifest';
import { ROOT } from 'ims-const';
import path = require('path');
import { runWebpack } from 'ims-webpack-util';
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
        runWebpack(cfg).subscribe(res => {
          console.log(res);
        });
        break;
      default:
        console.log(`add ${this.type}`);
    }
  }
}
