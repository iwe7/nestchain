import { optimize, Compiler } from 'webpack';
export class ImsWebpackCommonsChunkPlugin {
  plugin: optimize.CommonsChunkPlugin;
  constructor() {
    this.plugin = new optimize.CommonsChunkPlugin({});
  }
  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
