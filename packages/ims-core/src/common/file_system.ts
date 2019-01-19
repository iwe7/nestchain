export abstract class FileSystemEntity {
  lastModified: Date;
  name: string;
  path: string;
  parent: Folder;
  abstract remove(): Promise<any>;
  abstract removeSync(onError?: (error: any) => any): void;
  abstract rename(newName: string): Promise<any>;
  abstract renameSync(newName: string, onError?: (error: any) => any): void;
}

export abstract class File extends FileSystemEntity {
  extension: string;
  size: number;
  isLocked: boolean;
  abstract readText(encoding?: string): Promise<string>;
  abstract readTextSync(
    onError?: (error: any) => any,
    encoding?: string,
  ): string;
  abstract readSync(onError?: (error: any) => any): any;
  abstract writeText(content: string, encoding?: string): Promise<any>;
  abstract writeTextSync(
    content: string,
    onError?: (error: any) => any,
    encoding?: string,
  ): void;
  abstract writeSync(content: any, onError?: (error: any) => any): void;
}

export abstract class Folder extends FileSystemEntity {
  isKnown: boolean;
  abstract contains(name: string): boolean;
  abstract clear(): Promise<any>;
  abstract clearSync(onError?: (error: any) => void): void;
  abstract getFile(name: string): File;
  abstract getFolder(name: string): Folder;
  abstract getEntities(): Promise<Array<FileSystemEntity>>;
  abstract getEntitiesSync(
    onError?: (error: any) => any,
  ): Promise<Array<FileSystemEntity>>;
  abstract eachEntity(onEntity: (entity: FileSystemEntity) => boolean);
}
export abstract class FileSystemAccess {
  abstract getLastModified(path: string): Date;
  abstract getFileSize(path: string): number;
  abstract getParent(
    path: string,
    onError?: (error: any) => any,
  ): { path: string; name: string };
  abstract getFile(
    path: string,
    onError?: (error: any) => any,
  ): { path: string; name: string; extension: string };
  abstract getFolder(
    path: string,
    onError?: (error: any) => any,
  ): { path: string; name: string };
  abstract getEntities(
    path: string,
    onError?: (error: any) => any,
  ): Array<{ path: string; name: string; extension: string }>;
  abstract eachEntity(
    path: string,
    onEntity: (
      entity: { path: string; name: string; extension: string },
    ) => boolean,
    onError?: (error: any) => any,
  );
  abstract fileExists(path: string): boolean;
  abstract folderExists(path: string): boolean;
  abstract deleteFile(path: string, onError?: (error: any) => any);
  abstract deleteFolder(path: string, onError?: (error: any) => any);
  abstract emptyFolder(path: string, onError?: (error: any) => any): void;
  abstract rename(
    path: string,
    newPath: string,
    onError?: (error: any) => any,
  ): void;
  abstract getDocumentsFolderPath(): string;
  abstract getTempFolderPath(): string;
  abstract getLogicalRootPath(): string;
  abstract getCurrentAppPath(): string;
  abstract readText(
    path: string,
    onError?: (error: any) => any,
    encoding?: any,
  ): string;
  abstract read(path: string, onError?: (error: any) => any): any;
  abstract writeText(
    path: string,
    content: string,
    onError?: (error: any) => any,
    encoding?: any,
  );
  abstract write(path: string, content: any, onError?: (error: any) => any);
  abstract getFileExtension(path: string): string;
  abstract getPathSeparator(): string;
  abstract normalizePath(path: string): string;
  abstract joinPath(left: string, right: string): string;
  abstract joinPaths(paths: string[]): string;
}
