#!/usr/bin/env node
import 'reflect-metadata';
import { injector, Cli } from 'ims-cli';
import { AddCommand } from './add';
import { StartCommand } from './start';

@Cli({
  name: 'ims',
  version: '1.0',
  commands: [AddCommand, StartCommand],
})
export class ImsBin {}
injector(ImsBin);
