import { debug, Compiler } from 'webpack';
export class ImsWebpackProfilingPlugin {
  plugin: debug.ProfilingPlugin;
  constructor() {
    this.plugin = new debug.ProfilingPlugin();
  }
  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
