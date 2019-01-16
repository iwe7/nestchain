import { optimize, Compiler } from 'webpack';
export class ImsWebpackModuleConcatenationPlugin {
  plugin: optimize.ModuleConcatenationPlugin;
  constructor() {
    this.plugin = new optimize.ModuleConcatenationPlugin();
  }
  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
