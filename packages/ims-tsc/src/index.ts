import {
  Node,
  CompilerOptions,
  transform,
  TransformationResult,
  createDocumentRegistry,
  DocumentRegistry,
  Classifier,
  createClassifier,
  ScriptSnapshot,
  IScriptSnapshot,
  BuilderProgram,
  WatchCompilerHostOfConfigFile,
  WatchCompilerHostOfFilesAndCompilerOptions,
  WatchOfFilesAndCompilerOptions,
  WatchOfConfigFile,
  createWatchProgram,
  System,
  CreateProgram,
  DiagnosticReporter,
  WatchStatusReporter,
  ProjectReference,
  createWatchCompilerHost,
  Program,
  BuilderProgramHost,
  Diagnostic,
  CompilerHost,
  createAbstractBuilder,
  createEmitAndSemanticDiagnosticsBuilderProgram,
  EmitAndSemanticDiagnosticsBuilderProgram,
  SemanticDiagnosticsBuilderProgram,
  createSemanticDiagnosticsBuilderProgram,
  findConfigFile,
  resolveTripleslashReference,
  createCompilerHost,
  SourceFile,
  getPreEmitDiagnostics,
  CancellationToken,
  FormatDiagnosticsHost,
  formatDiagnostics,
  formatDiagnostic,
  formatDiagnosticsWithColorAndContext,
  DiagnosticMessageChain,
  flattenDiagnosticMessageText,
  ParsedCommandLine,
  getConfigFileParsingDiagnostics,
  CreateProgramOptions,
  createProgram,
  resolveProjectReferencePath,
  ResolveProjectReferencePathHost,
  ResolvedConfigFileName,
} from 'typescript';

import { Injectable, Injector } from 'ims-core';
import { CompilerOptionsToken, TransformerFactoryToken } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class ImsTsc {
  constructor(public injector: Injector) {}
  /**
   * 转换
   * @param source 源
   */
  transform<T extends Node>(source: T | T[]): TransformationResult<T> {
    let transformFactorys = this.injector.get(TransformerFactoryToken);
    let options = this.injector.get<CompilerOptions>(CompilerOptionsToken, {});
    return transform(source, transformFactorys, options);
  }

  resolveProjectReferencePath(ref: ProjectReference): ResolvedConfigFileName;
  resolveProjectReferencePath(
    host: ResolveProjectReferencePathHost,
    ref: ProjectReference,
  ): ResolvedConfigFileName;
  resolveProjectReferencePath(
    hostOrRef: ResolveProjectReferencePathHost | ProjectReference,
    ref?: ProjectReference,
  ): ResolvedConfigFileName {
    if (this.isResolveProjectReferencePathHost(hostOrRef)) {
      return resolveProjectReferencePath(hostOrRef, ref);
    } else {
      return resolveProjectReferencePath(hostOrRef);
    }
  }

  isResolveProjectReferencePathHost(
    val: any,
  ): val is ResolveProjectReferencePathHost {
    return Reflect.has(val, 'fileExists');
  }

  findConfigFile(
    searchPath: string,
    fileExists: (fileName: string) => boolean,
    configName?: string,
  ): string {
    return findConfigFile(searchPath, fileExists, configName);
  }

  resolveTripleslashReference(
    moduleName: string,
    containingFile: string,
  ): string {
    return resolveTripleslashReference(moduleName, containingFile);
  }

  createCompilerHost(
    options: CompilerOptions,
    setParentNodes?: boolean,
  ): CompilerHost {
    return createCompilerHost(options, setParentNodes);
  }

  getPreEmitDiagnostics(
    program: Program,
    sourceFile?: SourceFile,
    cancellationToken?: CancellationToken,
  ): Diagnostic[] {
    return getPreEmitDiagnostics(program, sourceFile, cancellationToken);
  }

  formatDiagnostics(...args: IformatDiagnostics2): string {
    return formatDiagnostics(...args);
  }

  formatDiagnostic(...args: IformatDiagnostics1) {
    return formatDiagnostic(...args);
  }

  formatDiagnosticsWithColorAndContext(
    diagnostics: ReadonlyArray<Diagnostic>,
    host: FormatDiagnosticsHost,
  ) {
    return formatDiagnosticsWithColorAndContext(diagnostics, host);
  }

  flattenDiagnosticMessageText(
    messageText: string | DiagnosticMessageChain | undefined,
    newLine: string,
  ): string {
    return flattenDiagnosticMessageText(messageText, newLine);
  }

  getConfigFileParsingDiagnostics(
    configFileParseResult: ParsedCommandLine,
  ): ReadonlyArray<Diagnostic> {
    return getConfigFileParsingDiagnostics(configFileParseResult);
  }

  createProgram(createProgramOptions: CreateProgramOptions): Program {
    return createProgram(createProgramOptions);
  }

  /**
   * 创建文档注册表
   * @param useCaseSensitiveFileNames 区分大小写
   * @param currentDirectory 当前目录
   */
  createDocumentRegistry(
    useCaseSensitiveFileNames?: boolean,
    currentDirectory?: string,
  ): DocumentRegistry {
    return createDocumentRegistry(useCaseSensitiveFileNames, currentDirectory);
  }

  /**
   * createSemanticDiagnosticsBuilderProgram
   */
  createSemanticDiagnosticsBuilderProgram(
    ...args:
      | IcreateSemanticDiagnosticsBuilderProgram1
      | IcreateSemanticDiagnosticsBuilderProgram2
  ) {
    if (isIcreateSemanticDiagnosticsBuilderProgram1(args)) {
      createSemanticDiagnosticsBuilderProgram(...args);
    } else {
      createSemanticDiagnosticsBuilderProgram(...args);
    }
  }

  /**
   * createEmitAndSemanticDiagnosticsBuilderProgram
   */
  createEmitAndSemanticDiagnosticsBuilderProgram(
    ...args:
      | IcreateEmitAndSemanticDiagnosticsBuilderProgram1
      | IcreateEmitAndSemanticDiagnosticsBuilderProgram2
  ): EmitAndSemanticDiagnosticsBuilderProgram {
    if (isIcreateEmitAndSemanticDiagnosticsBuilderProgram1(args)) {
      return createEmitAndSemanticDiagnosticsBuilderProgram(...args);
    } else {
      return createEmitAndSemanticDiagnosticsBuilderProgram(...args);
    }
  }

  /**
   * 创建分类器
   */
  createClassifier(): Classifier {
    return createClassifier();
  }

  fromString(text: string): IScriptSnapshot {
    return ScriptSnapshot.fromString(text);
  }

  /**
   * createWatchProgram
   * @param host createWatchCompilerHost
   */
  createWatchProgram<T extends BuilderProgram>(
    host:
      | WatchCompilerHostOfConfigFile<T>
      | WatchCompilerHostOfFilesAndCompilerOptions<T>,
  ): WatchOfFilesAndCompilerOptions<T> | WatchOfConfigFile<T> {
    if (isWatchCompilerHostOfConfigFile(host)) {
      return createWatchProgram(host);
    } else {
      return createWatchProgram(host);
    }
  }

  /**
   * create Abstract Builder
   * @param args
   */
  createAbstractBuilder(
    ...args: IcreateAbstractBuilder1 | IcreateAbstractBuilder2
  ): BuilderProgram {
    if (isIcreateAbstractBuilder1(args)) {
      return createAbstractBuilder(...args);
    } else {
      return createAbstractBuilder(...args);
    }
  }

  /**
   * create watch compiler host
   */
  createWatchCompilerHost<T extends BuilderProgram>(
    ...args: IcreateWatchCompilerHost2<T> | IcreateWatchCompilerHost1<T>
  ):
    | WatchCompilerHostOfConfigFile<T>
    | WatchCompilerHostOfFilesAndCompilerOptions<T> {
    if (isIcreateWatchCompilerHost1(args)) {
      return createWatchCompilerHost(...args);
    } else {
      return createWatchCompilerHost(...args);
    }
  }
}

export function isWatchCompilerHostOfConfigFile(
  val: any,
): val is WatchCompilerHostOfConfigFile<any> {
  return Reflect.has(val, 'configFileName');
}

export type IcreateWatchCompilerHost1<T extends BuilderProgram> = [
  string,
  CompilerOptions | undefined,
  System,
  CreateProgram<T>,
  DiagnosticReporter,
  WatchStatusReporter
];

export type IcreateWatchCompilerHost2<T extends BuilderProgram> = [
  string[],
  CompilerOptions,
  System,
  CreateProgram<T>,
  DiagnosticReporter,
  WatchStatusReporter,
  ReadonlyArray<ProjectReference>
];

function isIcreateWatchCompilerHost1<T extends BuilderProgram>(
  val: any,
): val is IcreateWatchCompilerHost1<T> {
  return typeof val[0] === 'string';
}

export type IcreateAbstractBuilder1 = [
  Program,
  BuilderProgramHost,
  BuilderProgram,
  ReadonlyArray<Diagnostic>
];

function isIcreateAbstractBuilder1(val: any): val is IcreateAbstractBuilder1 {
  return val.length === 4;
}

export type IcreateAbstractBuilder2 = [
  ReadonlyArray<string> | undefined,
  CompilerOptions | undefined,
  CompilerHost,
  BuilderProgram,
  ReadonlyArray<Diagnostic>,
  ReadonlyArray<ProjectReference>
];

export type IcreateEmitAndSemanticDiagnosticsBuilderProgram1 = [
  Program,
  BuilderProgramHost,
  EmitAndSemanticDiagnosticsBuilderProgram,
  ReadonlyArray<Diagnostic>
];

function isIcreateEmitAndSemanticDiagnosticsBuilderProgram1(
  val: any,
): val is IcreateEmitAndSemanticDiagnosticsBuilderProgram1 {
  return !Array.isArray(val);
}
export type IcreateEmitAndSemanticDiagnosticsBuilderProgram2 = [
  ReadonlyArray<string> | undefined,
  CompilerOptions | undefined,
  CompilerHost,
  EmitAndSemanticDiagnosticsBuilderProgram,
  ReadonlyArray<Diagnostic>,
  ReadonlyArray<ProjectReference>
];

export type IcreateSemanticDiagnosticsBuilderProgram1 = [
  Program,
  BuilderProgramHost,
  SemanticDiagnosticsBuilderProgram,
  ReadonlyArray<Diagnostic>
];
export type IcreateSemanticDiagnosticsBuilderProgram2 = [
  ReadonlyArray<string> | undefined,
  CompilerOptions | undefined,
  CompilerHost,
  SemanticDiagnosticsBuilderProgram,
  ReadonlyArray<Diagnostic>,
  ReadonlyArray<ProjectReference>
];

export function isIcreateSemanticDiagnosticsBuilderProgram1(
  val: any,
): val is IcreateSemanticDiagnosticsBuilderProgram1 {
  return !Array.isArray(val[0]);
}

export type IformatDiagnostics1 = [Diagnostic, FormatDiagnosticsHost];
export type IformatDiagnostics2 = [
  ReadonlyArray<Diagnostic>,
  FormatDiagnosticsHost
];
