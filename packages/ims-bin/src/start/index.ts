import { Command, Action, Option } from 'ims-cli';
@Command({
  name: 'start',
  alias: 's',
})
export class StartCommand {
  @Option({
    flags: 'p',
  })
  port: number;

  @Action()
  add() {
    console.log(`start at port: ${this.port}`);
  }
}
