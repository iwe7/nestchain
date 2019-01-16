import { NoEmitOnErrorsPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackNamedModulesPlugin {
  plugin: NoEmitOnErrorsPlugin;
  constructor() {
    this.plugin = new NoEmitOnErrorsPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
