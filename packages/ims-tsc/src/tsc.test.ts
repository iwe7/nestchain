import { Program } from './program';

import { corePlatform, getNgModuleStaticProvider } from 'ims-core';
import { ImsTscModule } from './module';
import * as ts from 'typescript';
import * as path from 'path';
let filename;
function createVisitor(context) {
  let visitor: ts.Visitor = (node: any) => {
    if (ts.isSourceFile(node)) {
      return ts.visitEachChild(node, visitor, context);
    }
    if (ts.isImportDeclaration(node)) {
      const importedLibName = (node.moduleSpecifier as ts.StringLiteral).text;
      if (importedLibName) {
        let pathName = path.resolve(path.dirname(filename), importedLibName);
        let cacheHash = hostMap.get(pathName);
        console.log(pathName);
      }
    }
    return node;
  };
  return visitor;
}

import { MultihashModule } from 'ims-multihash';
import { BeforeTransformerToken } from './transform';
import { hostMap } from './host';
corePlatform([
  () => getNgModuleStaticProvider(MultihashModule),
  {
    provide: BeforeTransformerToken,
    useFactory: () => {
      let fac: ts.TransformerFactory<ts.SourceFile> = (
        context: ts.TransformationContext,
      ): ts.Transformer<ts.SourceFile> => {
        return (node: ts.SourceFile): ts.SourceFile => {
          filename = node.fileName;
          ts.visitNode(node, createVisitor(context));
          return node;
        };
      };
      return fac;
    },
    multi: true,
  },
])
  .then(res => res.bootstrapModule(ImsTscModule))
  .then(res => {
    let injector = res.injector;
    let program = injector.get<Program>(Program);
    let source = program.emit();
    // let emit = builderProgram.emit(files[0]);
    debugger;
  });
