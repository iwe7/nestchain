import { HashedModuleIdsPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackHashedModuleIdsPlugin {
  plugin: HashedModuleIdsPlugin;
  constructor() {
    this.plugin = new HashedModuleIdsPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
