import { IgnorePlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackIgnorePlugin {
  plugin: IgnorePlugin;
  constructor() {
    this.plugin = new IgnorePlugin('');
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
