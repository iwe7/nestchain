import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'commit',
  alias: 'commit',
})
export class CommitCommand {
  @Option({
    flags: 'p',
  })
  path: string;

  @Action()
  add() {
    console.log(`add ${this.path}`);
  }
}
