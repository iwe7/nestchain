import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'push',
  alias: 'push',
})
export class PushCommand {
  @Option({
    flags: 'p',
  })
  path: string;

  @Action()
  add() {
    console.log(`add ${this.path}`);
  }
}
