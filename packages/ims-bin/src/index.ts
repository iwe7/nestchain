#!/usr/bin/env node
import { NgModule, bootstrapModule } from 'ims-core';
import { BuildCommand } from './build';
import { ImsBinToken } from './base';

import parser = require('yargs-parser');
import { from, of, isObservable } from 'ims-rxjs';
import { isPromise } from 'ims-util';
import { PackagesCommand } from './packages';
import { PackageCommand } from './package';
import { UglifyCommand } from './uglify';
import { CleanCommand } from './clean';
import { WxappCommand } from './wxapp';

@NgModule({
  providers: [
    {
      provide: ImsBinToken,
      useClass: BuildCommand,
      multi: true,
      deps: [],
    },
    {
      provide: ImsBinToken,
      useClass: PackageCommand,
      multi: true,
      deps: [],
    },
    {
      provide: ImsBinToken,
      useClass: WxappCommand,
      multi: true,
      deps: [],
    },
    {
      provide: ImsBinToken,
      useClass: CleanCommand,
      multi: true,
      deps: [],
    },
    {
      provide: ImsBinToken,
      useClass: PackagesCommand,
      multi: true,
      deps: [],
    },
    {
      provide: ImsBinToken,
      useClass: UglifyCommand,
      multi: true,
      deps: [],
    },
  ],
})
export class ImsBinModule {}

async function bootstrap() {
  let ref = await bootstrapModule(ImsBinModule);
  let commands = ref.injector.get(ImsBinToken);
  let flags = parser(process.argv.slice(2));
  const { _, ...opts } = flags;
  if (_.length > 0 && commands) {
    let command = commands.find(command => command.match(_[0], opts));
    if (command) {
      let res = command.run();
      if (res) {
        if (isPromise(res)) {
          return from(res);
        }
        if (isObservable(res)) {
          return res;
        }
        return of(res);
      } else {
        return of(void 0);
      }
    } else {
      console.log(`can not find command ${_[0]}`);
      return of(void 0);
    }
  }
}

bootstrap();
