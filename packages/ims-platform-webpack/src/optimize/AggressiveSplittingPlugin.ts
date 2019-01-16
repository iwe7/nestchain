import { optimize, Compiler } from 'webpack';
export class ImsWebpackAggressiveSplittingPlugin {
  plugin: optimize.AggressiveSplittingPlugin;
  constructor() {
    this.plugin = new optimize.AggressiveSplittingPlugin();
  }
  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
