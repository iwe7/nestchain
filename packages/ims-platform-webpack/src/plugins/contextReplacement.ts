import { ContextReplacementPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackContextReplacementPlugin {
  plugin: ContextReplacementPlugin;
  constructor() {
    this.plugin = new ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    );
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
