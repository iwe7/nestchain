#!/usr/bin/env node
import 'reflect-metadata';
import { injector, Cli } from 'ims-cli';
import { AddCommand } from './add';
@Cli({
  name: 'ims',
  version: '1.0',
  commands: [AddCommand],
})
export class ImsBin {}
injector(ImsBin);
debugger;
