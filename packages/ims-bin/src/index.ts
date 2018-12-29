#!/usr/bin/env node
import 'reflect-metadata';
import { injector, Cli } from 'ims-cli';
import { AddCommand } from './add';
import { StartCommand } from './start';
import { VersionCommand } from './version';
import { BuildCommand } from './build';
import { ServerCommand } from './server';

@Cli({
  name: 'ims',
  version: '1.0',
  commands: [
    AddCommand,
    StartCommand,
    VersionCommand,
    BuildCommand,
    ServerCommand,
  ],
})
export class ImsBin {}
injector(ImsBin);
