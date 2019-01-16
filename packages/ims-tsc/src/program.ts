import { ROOT } from 'ims-const';
import { Provider, Injector } from 'ims-core';
import { CompilerHost } from './host';
import { CompilerOptionsToken } from './tokens';
import { join } from 'path';
import * as ts from 'typescript';

export abstract class ScriptReferenceHost implements ts.ScriptReferenceHost {
  abstract getCompilerOptions(): ts.CompilerOptions;
  abstract getSourceFile(fileName: string): ts.SourceFile | undefined;
  abstract getSourceFileByPath(path: ts.Path): ts.SourceFile | undefined;
  abstract getCurrentDirectory(): string;
}
export abstract class Program extends ScriptReferenceHost
  implements ts.Program {
  abstract getRootFileNames(): ReadonlyArray<string>;
  abstract getSourceFiles(): ReadonlyArray<ts.SourceFile>;
  abstract emit(
    targetSourceFile?: ts.SourceFile,
    writeFile?: ts.WriteFileCallback,
    cancellationToken?: ts.CancellationToken,
    emitOnlyDtsFiles?: boolean,
    customTransformers?: ts.CustomTransformers,
  ): ts.EmitResult;
  abstract getOptionsDiagnostics(
    cancellationToken?: ts.CancellationToken,
  ): ReadonlyArray<ts.Diagnostic>;
  abstract getGlobalDiagnostics(
    cancellationToken?: ts.CancellationToken,
  ): ReadonlyArray<ts.Diagnostic>;
  abstract getSyntacticDiagnostics(
    sourceFile?: ts.SourceFile,
    cancellationToken?: ts.CancellationToken,
  ): ReadonlyArray<ts.DiagnosticWithLocation>;
  /** The first time this is called, it will return global diagnostics (no location). */
  abstract getSemanticDiagnostics(
    sourceFile?: ts.SourceFile,
    cancellationToken?: ts.CancellationToken,
  ): ReadonlyArray<ts.Diagnostic>;
  abstract getDeclarationDiagnostics(
    sourceFile?: ts.SourceFile,
    cancellationToken?: ts.CancellationToken,
  ): ReadonlyArray<ts.DiagnosticWithLocation>;
  abstract getConfigFileParsingDiagnostics(): ReadonlyArray<ts.Diagnostic>;
  /**
   * Gets a type checker that can be used to semantically analyze source files in the program.
   */
  abstract getTypeChecker(): ts.TypeChecker;
  abstract isSourceFileFromExternalLibrary(file: ts.SourceFile): boolean;
  abstract isSourceFileDefaultLibrary(file: ts.SourceFile): boolean;
  abstract getProjectReferences():
    | ReadonlyArray<ts.ProjectReference>
    | undefined;
  abstract getResolvedProjectReferences():
    | (ts.ResolvedProjectReference | undefined)[]
    | undefined;
}
import { RootNamesToken } from './tokens';
export const providers: Provider[] = [
  {
    provide: RootNamesToken,
    useValue: join(ROOT, 'src/index.ts'),
    multi: true,
  },
  {
    provide: Program,
    useFactory: (injector: Injector) => {
      let rootNames = injector.get<string[]>(RootNamesToken);
      return ts.createProgram({
        rootNames: rootNames,
        options: injector.get<ts.CompilerOptions>(CompilerOptionsToken),
        host: injector.get<CompilerHost>(CompilerHost),
      });
    },
    deps: [Injector],
  },
];
