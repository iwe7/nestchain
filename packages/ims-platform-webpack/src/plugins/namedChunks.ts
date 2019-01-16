import { NamedChunksPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackNamedChunksPlugin {
  plugin: NamedChunksPlugin;
  constructor() {
    this.plugin = new NamedChunksPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
