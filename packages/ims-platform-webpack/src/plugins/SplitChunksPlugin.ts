import { SplitChunksPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackSplitChunksPlugin {
  plugin: SplitChunksPlugin;
  constructor() {
    this.plugin = new SplitChunksPlugin({});
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
