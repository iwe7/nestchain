#!/usr/bin/env node
import 'reflect-metadata';
import { NgModule, createPlatformFactory, corePlatform } from 'ims-core';
import { BuildCommand } from './build';
import { ImsBinToken } from './base';

@NgModule({
  providers: [
    {
      provide: ImsBinToken,
      useClass: BuildCommand,
      multi: true,
      deps: [],
    },
  ],
})
export class ImsBinModule {}

import parser = require('yargs-parser');
import { switchMap } from 'rxjs/operators';
import { from, of, isObservable } from 'rxjs';
import { isPromise } from 'ims-util';
const imsBinPlatform = createPlatformFactory(corePlatform, 'ims-bin', []);
imsBinPlatform([])
  .bootstrapModule(ImsBinModule)
  .pipe(
    switchMap(res => {
      let commands = res.injector.get(ImsBinToken);
      let flags = parser(process.argv.slice(2));
      const { _, ...opts } = flags;
      if (_.length > 0) {
        let command = commands.find(command => command.match(_[0], opts));
        if (command) {
          let res = command.run();
          if (isPromise(res)) {
            return from(res);
          }
          if (isObservable(res)) {
            return res;
          }
          return of(res);
        } else {
          console.log(`can not find command ${_[0]}`);
          return of(void 0);
        }
      }
    }),
  )
  .subscribe();
