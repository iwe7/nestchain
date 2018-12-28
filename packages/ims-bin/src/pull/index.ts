import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'pull',
  alias: 'pull',
})
export class PullCommand {
  @Option({
    flags: 'p',
  })
  path: string;

  @Action()
  add() {
    console.log(`add ${this.path}`);
  }
}
