import { Command, Action, Option } from 'ims-cli';
import { ROOT } from 'ims-const';
import path = require('path');
import 'reflect-metadata';
import { gulp } from 'ims-gulp';

@Command({
  name: 'addon',
  alias: 'addon',
})
export class BuildCommand {
  @Option({
    flags: 'n',
  })
  name: string;

  @Action()
  add() {
    gulp(
      path.join(ROOT, 'src/addons', this.name),
      path.join(ROOT, 'www/addons', this.name),
    )(false);
  }
}
