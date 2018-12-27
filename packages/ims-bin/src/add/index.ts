import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'add',
  alias: 'a',
})
export class AddCommand {
  @Option({
    flags: 'p',
  })
  path: string;

  @Action()
  add() {
    console.log(`add ${this.path}`);
  }
}
