# `ims-cli`

> 命令行开发工具

```ts
#!/usr/bin/env node
import 'reflect-metadata';
import { Cli, Command, Action, Option } from 'ims-cli';

@Command({
  name: 'test',
  alias: 't',
})
export class TestCommand {
  @Option({
    flags: 'p',
  })
  p: string = '10';

  @Action()
  add() {
    console.log(this);
    debugger;
  }
}

@Cli({
  name: 'cli',
  version: '1.0',
  commands: [TestCommand],
})
export class CliApp {}
```
