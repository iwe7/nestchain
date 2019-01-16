import { NamedModulesPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackNamedModulesPlugin {
  plugin: NamedModulesPlugin;
  constructor() {
    this.plugin = new NamedModulesPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
