import { ExtendedAPIPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackExtendedAPIPlugin {
  plugin: ExtendedAPIPlugin;
  constructor() {
    this.plugin = new ExtendedAPIPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
