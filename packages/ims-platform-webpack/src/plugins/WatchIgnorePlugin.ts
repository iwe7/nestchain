import { WatchIgnorePlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackWatchIgnorePlugin {
  plugin: WatchIgnorePlugin;
  constructor() {
    this.plugin = new WatchIgnorePlugin([]);
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
