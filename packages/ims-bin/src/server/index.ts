import { Command, Action, Option } from 'ims-cli';
import { bootstrap } from 'ims-server';
@Command({
  name: 'server',
  alias: 'server',
})
export class ServerCommand {
  @Option({
    flags: 'p',
  })
  port: number;

  @Action()
  add() {
    bootstrap(this.port);
  }
}
