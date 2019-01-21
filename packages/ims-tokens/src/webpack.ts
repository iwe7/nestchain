import { InjectionToken } from 'ims-core';
import { Configuration, Compiler, MultiCompiler, MultiWatching } from 'webpack';
export interface Webpack {
  webpack(
    options: Configuration,
    handler: Compiler.Handler,
  ): Compiler.Watching | Compiler;
  webpack(options?: Configuration): Compiler;
  webpack(
    options: Configuration[],
    handler: MultiCompiler.Handler,
  ): MultiWatching | MultiCompiler;
  webpack(options: Configuration[]): MultiCompiler;
}
export const Webpack = new InjectionToken<Webpack>('Webpack');
