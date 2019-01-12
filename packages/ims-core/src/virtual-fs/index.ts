import { Observable } from '../rxjs/index';
import { Logger } from '../logger';
import { JsonObject } from '../json';

export type FileBuffer = ArrayBuffer;
export type FileBufferLike = ArrayBufferLike;
export type PathFragment = Path & {
  __PRIVATE_DEVKIT_PATH_FRAGMENT: void;
};
export type Path = string & {
  __PRIVATE_DEVKIT_PATH: void;
};
export type Stats<T extends object = {}> = T & {
  isFile(): boolean;
  isDirectory(): boolean;
  readonly size: number;
  readonly atime: Date;
  readonly mtime: Date;
  readonly ctime: Date;
  readonly birthtime: Date;
};
export abstract class ReadonlyHost<StatsT extends object = {}> {
  abstract read(path: Path): Observable<FileBuffer>;
  abstract list(path: Path): Observable<PathFragment[]>;
  abstract exists(path: Path): Observable<boolean>;
  abstract isDirectory(path: Path): Observable<boolean>;
  abstract isFile(path: Path): Observable<boolean>;
  abstract stat(path: Path): Observable<Stats<StatsT> | null> | null;
}
export interface HostWatchOptions {
  readonly persistent?: boolean;
  readonly recursive?: boolean;
}
export const enum HostWatchEventType {
  Changed = 0,
  Created = 1,
  Deleted = 2,
  Renamed = 3,
}
export interface HostWatchEvent {
  readonly time: Date;
  readonly type: HostWatchEventType;
  readonly path: Path;
}

export abstract class WriteableHost<
  StatsT extends object = {}
> extends ReadonlyHost<StatsT> {
  abstract write(path: Path, content: FileBufferLike): Observable<void>;
  abstract delete(path: Path): Observable<void>;
  abstract rename(from: Path, to: Path): Observable<void>;
  abstract watch(
    path: Path,
    options?: HostWatchOptions,
  ): Observable<HostWatchEvent> | null;
}

export abstract class Host<StatsT extends object = {}> extends WriteableHost<
  StatsT
> {}

export abstract class Workspace {
  abstract get root(): Path;
  abstract get host(): Host;
  abstract get version(): number;
  abstract get newProjectRoot(): string;
  abstract loadWorkspaceFromJson(json: object): Observable<Workspace>;
  abstract loadWorkspaceFromHost(workspacePath: Path): Observable<Workspace>;
  abstract listProjectNames(): string[];
  abstract getProject(projectName: string): WorkspaceProject;
  abstract getDefaultProjectName(): string | null;
  abstract getProjectByPath(path: Path): string | null;
  abstract getCli(): WorkspaceTool;
  abstract getSchematics(): WorkspaceTool;
  abstract getTargets(): WorkspaceTool;
  abstract getProjectCli(projectName: string): WorkspaceTool;
  abstract getProjectSchematics(projectName: string): WorkspaceTool;
  abstract getProjectTargets(projectName: string): WorkspaceTool;
}

export interface WorkspaceProject {
  projectType: 'application' | 'library';
  root: string;
  sourceRoot?: string;
  prefix: string;
  cli?: WorkspaceTool;
  schematics?: WorkspaceTool;
  architect?: WorkspaceTool;
  targets?: WorkspaceTool;
}

export interface WorkspaceTool {
  $schema?: string;
  [k: string]: any;
}
export interface TargetSpecifier<OptionsT = {}> {
  project: string;
  target: string;
  configuration?: string;
  overrides?: Partial<OptionsT>;
}
export abstract class Architect {
  abstract loadArchitect(): Observable<Architect>;
  abstract listProjectTargets(projectName: string): string[];
  abstract getBuilderConfiguration<OptionsT>(
    targetSpec: TargetSpecifier,
  ): BuilderConfiguration<OptionsT>;
  abstract run<OptionsT>(
    builderConfig: BuilderConfiguration<OptionsT>,
    partialContext: Partial<BuilderContext>,
  ): Observable<BuildEvent>;
  abstract getBuilderDescription<OptionsT>(
    builderConfig: BuilderConfiguration<OptionsT>,
  ): Observable<BuilderDescription>;
  abstract validateBuilderOptions<OptionsT>(
    builderConfig: BuilderConfiguration<OptionsT>,
    builderDescription: BuilderDescription,
  ): Observable<BuilderConfiguration<OptionsT>>;
  abstract getBuilder<OptionsT>(
    builderDescription: BuilderDescription,
    context: BuilderContext,
  ): Builder<OptionsT>;
}
export interface BuilderContext {
  logger: Logger;
  host: Host<{}>;
  workspace: Workspace;
  architect: Architect;
  targetSpecifier?: TargetSpecifier;
}
export interface BuilderDescription {
  name: string;
  schema: JsonObject;
  description: string;
}
export interface BuilderConfiguration<OptionsT = {}> {
  root: Path;
  sourceRoot?: Path;
  projectType: string;
  builder: string;
  options: OptionsT;
}
export interface BuildEvent<BuildResultT = any> {
  success: boolean;
  result?: BuildResultT;
}
export interface Builder<OptionsT> {
  run(
    builderConfig: BuilderConfiguration<Partial<OptionsT>>,
  ): Observable<BuildEvent>;
}

export abstract class Command {
  public cmd: string;
  public args: string[];
  public cwd: string;
  public expectedExitCode: number;
  abstract toString(): string;
}
