#!/usr/bin/env node
import 'reflect-metadata';
import { CliVisitor } from './cli.visitor';
import { injector } from 'ims-decorator';
import { Cli, Command, Action, Option, Param } from './decorator';
@Command({
  name: 'test',
  alias: 't',
  desc: 'test',
})
export class TestCommand {
  @Option({
    flags: 'p',
  })
  path: string;

  @Param({
    name: 'debug',
    other: false,
  })
  debug: boolean;

  @Action()
  add() {
    console.log('add');
  }
}
@Command({
  name: 'test2',
  alias: 't2',
  desc: 'test2',
})
export class TestCommand2 {
  @Option({
    flags: 'p',
  })
  path: string;

  @Param({
    name: 'debug',
    other: false,
  })
  debug: boolean;

  @Action()
  add() {
    console.log('add2');
  }
}

@Cli({
  name: 'cli',
  version: '1.0',
  description: 'cli test',
  commands: [TestCommand, TestCommand2],
})
export class CliApp {}
let target = injector(new CliVisitor())(CliApp);
