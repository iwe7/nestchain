import { ProvidePlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackProvidePlugin {
  plugin: ProvidePlugin;
  constructor() {
    this.plugin = new ProvidePlugin({});
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
