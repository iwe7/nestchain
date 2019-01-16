import { DefinePlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackDefinePlugin {
  plugin: DefinePlugin;
  constructor() {
    this.plugin = new DefinePlugin({});
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
