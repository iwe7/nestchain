import { Command, Action, Option } from 'ims-cli';

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

  @Action()
  add() {
    console.log(`add ${this.type}`);
  }
}
