import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'build',
  alias: 'b',
})
export class AddCommand {
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
    console.log(`add ${this.path}`);
  }
}
