import { InjectionToken } from 'ims-core';

interface ParsedPath {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
}

interface FormatInputPathObject {
  root?: string;
  dir?: string;
  base?: string;
  ext?: string;
  name?: string;
}

export interface Path {
  sep: '\\' | '/';
  delimiter: ';' | ':';
  parse(pathString: string): ParsedPath;
  format(pathObject: FormatInputPathObject): string;
  extname(p: string): string;
  basename(p: string, ext?: string): string;
  dirname(p: string): string;
  normalize(p: string): string;
  join(...paths: string[]): string;
  resolve(...pathSegments: string[]): string;
  isAbsolute(path: string): boolean;
  relative(from: string, to: string): string;
}
export const Path = new InjectionToken<Path>('Path');
