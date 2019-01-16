import { HotModuleReplacementPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackHotModuleReplacementPlugin {
  plugin: HotModuleReplacementPlugin;
  constructor() {
    this.plugin = new HotModuleReplacementPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
