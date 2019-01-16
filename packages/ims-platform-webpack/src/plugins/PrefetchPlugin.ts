import { PrefetchPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackPrefetchPlugin {
  plugin: PrefetchPlugin;
  constructor() {
    this.plugin = new PrefetchPlugin('', '');
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
