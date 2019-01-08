#!/usr/bin/env node
import 'reflect-metadata';
import { NgModule, createPlatformFactory, corePlatform } from 'ims-core';
import { BuildCommand } from './build';
import { ImsBinToken } from './base';

import parser = require('yargs-parser');
import { concatMap } from 'ims-rxjs/operators';
import { from, of, isObservable } from 'ims-rxjs';
import { isPromise } from 'ims-util';
import { PackagesCommand } from './packages';
import { UglifyCommand } from './uglify';
import { CleanCommand } from './clean';

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

const imsBinPlatform = createPlatformFactory(corePlatform, 'ims-bin', []);
imsBinPlatform([])
  .bootstrapModule(ImsBinModule)
  .pipe(
    concatMap(res => {
      let commands = res.injector.get(ImsBinToken);
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
    }),
  )
  .subscribe();
