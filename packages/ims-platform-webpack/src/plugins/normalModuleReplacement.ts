import { NormalModuleReplacementPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackNormalModuleReplacementPlugin {
  plugin: NormalModuleReplacementPlugin;
  constructor() {
    this.plugin = new NormalModuleReplacementPlugin('', '');
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
