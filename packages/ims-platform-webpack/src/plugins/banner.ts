import { BannerPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackBannerPlugin {
  plugin: BannerPlugin;
  constructor() {
    this.plugin = new BannerPlugin({
      banner: `test banner`,
    });
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
