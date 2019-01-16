import { corePlatform, NgModule } from 'ims-core';
import { ImsGulpTscModule } from './module';
import { CompilerHost } from './host';
import { ScriptTarget } from 'typescript';

@NgModule()
export class GulpTscTestModule {}

corePlatform()
  .then(res => res.bootstrapModule(ImsGulpTscModule))
  .then(res => {
    let host = res.injector.get<CompilerHost>(CompilerHost);
    let sourceFile = host.getSourceFile('src/index.ts', ScriptTarget.ESNext);
    debugger;
  });
