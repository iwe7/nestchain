import { SourceMapDevToolPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackSourceMapDevToolPlugin {
  plugin: SourceMapDevToolPlugin;
  constructor() {
    this.plugin = new SourceMapDevToolPlugin({});
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
