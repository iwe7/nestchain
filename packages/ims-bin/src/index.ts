#!/usr/bin/env node
import 'reflect-metadata';
import { injector, Cli } from 'ims-cli';
import { AddCommand } from './add';
import { StartCommand } from './start';
import { VersionCommand } from './version';

@Cli({
  name: 'ims',
  version: '1.0',
  commands: [AddCommand, StartCommand, VersionCommand],
})
export class ImsBin {}
injector(ImsBin);
