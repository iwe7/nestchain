import { optimize, Compiler } from 'webpack';
export class ImsWebpackMinChunkSizePlugin {
  plugin: optimize.MinChunkSizePlugin;
  constructor() {
    this.plugin = new optimize.MinChunkSizePlugin({
      minChunkSize: 10000,
    });
  }
  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
