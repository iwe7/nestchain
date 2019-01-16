import { Program } from './program';
import { CompilerHost } from './host';
import { corePlatform } from 'ims-core';
import { ImsTscModule } from './module';

import { ROOT } from 'ims-const';
import { join } from 'path';
import { ScriptTarget } from 'typescript';

let tsconfig = require(join(ROOT, 'tsconfig.json'));

corePlatform()
  .then(res => res.bootstrapModule(ImsTscModule))
  .then(res => {
    let injector = res.injector;
    let program = injector.get<Program>(Program);
    let host = injector.get<CompilerHost>(CompilerHost);
    let sourceFile = host.getSourceFile('src/index.ts', ScriptTarget.ES2015);
    let source = program.emit();
    debugger;
  });
