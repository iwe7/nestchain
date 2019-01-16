import { EnvironmentPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackEnvironmentPlugin {
  plugin: EnvironmentPlugin;
  constructor() {
    this.plugin = new EnvironmentPlugin({});
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
