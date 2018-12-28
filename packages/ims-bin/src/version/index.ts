import { Command, Action, Option } from 'ims-cli';

@Command({
  name: 'version',
  alias: 'v',
})
export class VersionCommand {
  @Action()
  add() {
    console.log(`version:0.0.4`);
  }
}
