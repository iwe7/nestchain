import { InjectionToken } from 'ims-core';
import { Response, Handler } from 'express';
interface ServeStaticOptions {
  cacheControl?: boolean;
  dotfiles?: string;
  etag?: boolean;
  extensions?: string[];
  fallthrough?: boolean;
  immutable?: boolean;
  index?: boolean | string | string[];
  lastModified?: boolean;
  maxAge?: number | string;
  redirect?: boolean;
  setHeaders?: (res: Response, path: string, stat: any) => any;
}
export interface ServeStatic {
  serveStatic(root: string, options?: ServeStaticOptions): Handler;
}
export const ServeStatic = new InjectionToken('ServeStatic');
