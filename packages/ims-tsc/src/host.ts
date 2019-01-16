import { Provider, Injector, ErrorSubject } from 'ims-core';
import * as ts from 'typescript';
import * as path from 'path';
import { ROOT } from 'ims-const';

export abstract class ModuleResolutionHost implements ts.ModuleResolutionHost {
  abstract fileExists(fileName: string): boolean;
  abstract readFile(fileName: string): string | undefined;
  abstract trace?(s: string): void;
  abstract directoryExists?(directoryName: string): boolean;
  abstract realpath?(path: string): string;
  abstract getCurrentDirectory?(): string;
  abstract getDirectories?(path: string): string[];
}

export abstract class CompilerHost extends ModuleResolutionHost
  implements ts.CompilerHost {
  abstract getSourceFile(
    fileName: string,
    languageVersion: ts.ScriptTarget,
    onError?: (message: string) => void,
    shouldCreateNewSourceFile?: boolean,
  ): ts.SourceFile | undefined;
  abstract getSourceFileByPath?(
    fileName: string,
    path: ts.Path,
    languageVersion: ts.ScriptTarget,
    onError?: (message: string) => void,
    shouldCreateNewSourceFile?: boolean,
  ): ts.SourceFile | undefined;
  abstract getCancellationToken?(): ts.CancellationToken;
  abstract getDefaultLibFileName(options: ts.CompilerOptions): string;
  abstract getDefaultLibLocation?(): string;
  writeFile: ts.WriteFileCallback;
  abstract getCurrentDirectory(): string;
  abstract getDirectories(path: string): string[];
  abstract getCanonicalFileName(fileName: string): string;
  abstract useCaseSensitiveFileNames(): boolean;
  abstract getNewLine(): string;
  abstract readDirectory?(
    rootDir: string,
    extensions: ReadonlyArray<string>,
    excludes: ReadonlyArray<string> | undefined,
    includes: ReadonlyArray<string>,
    depth?: number,
  ): string[];
  abstract resolveModuleNames?(
    moduleNames: string[],
    containingFile: string,
    reusedNames?: string[],
  ): (ts.ResolvedModule | undefined)[];
  abstract resolveTypeReferenceDirectives?(
    typeReferenceDirectiveNames: string[],
    containingFile: string,
  ): ts.ResolvedTypeReferenceDirective[];
  abstract getEnvironmentVariable?(name: string): string | undefined;
  abstract createHash?(data: string): string;
}

import { CompilerOptionsToken, TsConfigFileToken } from './tokens';
export const providers: Provider[] = [
  {
    provide: CompilerHost,
    useFactory: (injector: Injector) => {
      let options = injector.get<ts.CompilerOptions>(CompilerOptionsToken);
      return ts.createCompilerHost(options);
    },
    deps: [Injector],
  },
  {
    provide: TsConfigFileToken,
    useValue: path.join(ROOT, 'tsconfig.json'),
  },
  {
    provide: CompilerOptionsToken,
    useFactory: (injector: Injector) => {
      let tsConfigFileName = injector.get<string>(TsConfigFileToken);
      let error = injector.get<ErrorSubject<any>>(ErrorSubject);
      let projectDirectory = path.dirname(tsConfigFileName);
      let settings = {};
      const settingsResult = ts.convertCompilerOptionsFromJson(
        settings,
        projectDirectory,
      );
      let compilerOptions = settingsResult.options;
      if (settingsResult.errors) {
        error.next(settingsResult.errors);
      }
      let tsConfig = ts.readConfigFile(tsConfigFileName, ts.sys.readFile);
      if (tsConfig.error) {
        error.next(tsConfig.error);
      }
      let parsed: ts.ParsedCommandLine = ts.parseJsonConfigFileContent(
        tsConfig.config || {},
        getTsconfigSystem(),
        path.resolve(projectDirectory),
        compilerOptions,
        path.basename(tsConfigFileName),
      );
      if (parsed.errors) {
        error.next(parsed.errors);
      }
      let options = parsed.options;
      normalizeCompilerOptions(options);
      return options;
    },
    deps: [Injector],
  },
];

function getTsconfigSystem(): ts.ParseConfigHost {
  return {
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
    readDirectory: () => [],
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
  };
}

function normalizeCompilerOptions(options: ts.CompilerOptions): void {
  options.sourceMap = true;
  (options as any).suppressOutputPathCheck = true;
  options.inlineSourceMap = false;
  options.sourceRoot = undefined;
  options.inlineSources = false;
  if (
    'createFileLevelUniqueName' in ts &&
    options.declaration &&
    !options.isolatedModules
  ) {
    options.declarationMap = true;
  }
}
