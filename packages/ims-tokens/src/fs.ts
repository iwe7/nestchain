import { InjectionToken } from 'ims-core';
type PathLike = string | Buffer | URL;
export interface MakeDirectoryOptions {
  recursive?: boolean;
  mode?: number;
}
interface Stats {
  isFile(): boolean;
  isDirectory(): boolean;
  isBlockDevice(): boolean;
  isCharacterDevice(): boolean;
  isSymbolicLink(): boolean;
  isFIFO(): boolean;
  isSocket(): boolean;
  dev: number;
  ino: number;
  mode: number;
  nlink: number;
  uid: number;
  gid: number;
  rdev: number;
  size: number;
  blksize: number;
  blocks: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
}
interface FileHandle {
  readonly fd: number;
  appendFile(
    data: any,
    options?:
      | {
          encoding?: string | null;
          mode?: string | number;
          flag?: string | number;
        }
      | string
      | null,
  ): Promise<void>;
  chown(uid: number, gid: number): Promise<void>;
  chmod(mode: string | number): Promise<void>;
  datasync(): Promise<void>;
  sync(): Promise<void>;
  read<TBuffer extends Buffer | Uint8Array>(
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesRead: number; buffer: TBuffer }>;
  readFile(
    options?: { encoding?: null; flag?: string | number } | null,
  ): Promise<Buffer>;
  readFile(
    options:
      | { encoding: BufferEncoding; flag?: string | number }
      | BufferEncoding,
  ): Promise<string>;
  readFile(
    options?:
      | { encoding?: string | null; flag?: string | number }
      | string
      | null,
  ): Promise<string | Buffer>;
  stat(): Promise<Stats>;
  truncate(len?: number): Promise<void>;
  utimes(
    atime: string | number | Date,
    mtime: string | number | Date,
  ): Promise<void>;
  write<TBuffer extends Buffer | Uint8Array>(
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesWritten: number; buffer: TBuffer }>;
  write(
    data: any,
    position?: number | null,
    encoding?: string | null,
  ): Promise<{ bytesWritten: number; buffer: string }>;
  writeFile(
    data: any,
    options?:
      | {
          encoding?: string | null;
          mode?: string | number;
          flag?: string | number;
        }
      | string
      | null,
  ): Promise<void>;
  close(): Promise<void>;
}
export interface Fs {
  access(path: PathLike, mode?: number): Promise<void>;
  copyFile(src: PathLike, dest: PathLike, flags?: number): Promise<void>;
  open(
    path: PathLike,
    flags: string | number,
    mode?: string | number,
  ): Promise<FileHandle>;

  read<TBuffer extends Buffer | Uint8Array>(
    handle: FileHandle,
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesRead: number; buffer: TBuffer }>;

  write<TBuffer extends Buffer | Uint8Array>(
    handle: FileHandle,
    buffer: TBuffer,
    offset?: number | null,
    length?: number | null,
    position?: number | null,
  ): Promise<{ bytesWritten: number; buffer: TBuffer }>;

  write(
    handle: FileHandle,
    string: any,
    position?: number | null,
    encoding?: string | null,
  ): Promise<{ bytesWritten: number; buffer: string }>;

  rename(oldPath: PathLike, newPath: PathLike): Promise<void>;

  truncate(path: PathLike, len?: number): Promise<void>;
  ftruncate(handle: FileHandle, len?: number): Promise<void>;
  rmdir(path: PathLike): Promise<void>;
  fdatasync(handle: FileHandle): Promise<void>;
  fsync(handle: FileHandle): Promise<void>;
  mkdir(
    path: PathLike,
    options?: number | string | MakeDirectoryOptions | null,
  ): Promise<void>;
  readdir(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
  ): Promise<string[]>;
  readdir(
    path: PathLike,
    options: { encoding: 'buffer' } | 'buffer',
  ): Promise<Buffer[]>;
  readdir(
    path: PathLike,
    options?: { encoding?: string | null } | string | null,
  ): Promise<string[] | Buffer[]>;
  readlink(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
  ): Promise<string>;
  readlink(
    path: PathLike,
    options: { encoding: 'buffer' } | 'buffer',
  ): Promise<Buffer>;
  readlink(
    path: PathLike,
    options?: { encoding?: string | null } | string | null,
  ): Promise<string | Buffer>;
  symlink(
    target: PathLike,
    path: PathLike,
    type?: string | null,
  ): Promise<void>;
  fstat(handle: FileHandle): Promise<Stats>;
  lstat(path: PathLike): Promise<Stats>;
  stat(path: PathLike): Promise<Stats>;
  link(existingPath: PathLike, newPath: PathLike): Promise<void>;
  unlink(path: PathLike): Promise<void>;
  fchmod(handle: FileHandle, mode: string | number): Promise<void>;
  chmod(path: PathLike, mode: string | number): Promise<void>;
  lchmod(path: PathLike, mode: string | number): Promise<void>;
  lchown(path: PathLike, uid: number, gid: number): Promise<void>;
  fchown(handle: FileHandle, uid: number, gid: number): Promise<void>;
  chown(path: PathLike, uid: number, gid: number): Promise<void>;
  utimes(
    path: PathLike,
    atime: string | number | Date,
    mtime: string | number | Date,
  ): Promise<void>;
  futimes(
    handle: FileHandle,
    atime: string | number | Date,
    mtime: string | number | Date,
  ): Promise<void>;
  realpath(
    path: PathLike,
    options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
  ): Promise<string>;
  realpath(
    path: PathLike,
    options: { encoding: 'buffer' } | 'buffer',
  ): Promise<Buffer>;
  realpath(
    path: PathLike,
    options?: { encoding?: string | null } | string | null,
  ): Promise<string | Buffer>;
  mkdtemp(
    prefix: string,
    options?: { encoding?: BufferEncoding | null } | BufferEncoding | null,
  ): Promise<string>;
  mkdtemp(
    prefix: string,
    options: { encoding: 'buffer' } | 'buffer',
  ): Promise<Buffer>;
  mkdtemp(
    prefix: string,
    options?: { encoding?: string | null } | string | null,
  ): Promise<string | Buffer>;
  writeFile(
    path: PathLike | FileHandle,
    data: any,
    options?:
      | {
          encoding?: string | null;
          mode?: string | number;
          flag?: string | number;
        }
      | string
      | null,
  ): Promise<void>;
  appendFile(
    path: PathLike | FileHandle,
    data: any,
    options?:
      | {
          encoding?: string | null;
          mode?: string | number;
          flag?: string | number;
        }
      | string
      | null,
  ): Promise<void>;
  readFile(
    path: PathLike | FileHandle,
    options?: { encoding?: null; flag?: string | number } | null,
  ): Promise<Buffer>;
  readFile(
    path: PathLike | FileHandle,
    options:
      | { encoding: BufferEncoding; flag?: string | number }
      | BufferEncoding,
  ): Promise<string>;
  readFile(
    path: PathLike | FileHandle,
    options?:
      | { encoding?: string | null; flag?: string | number }
      | string
      | null,
  ): Promise<string | Buffer>;
}

export const Fs = new InjectionToken<Fs>('Fs');
