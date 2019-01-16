import ZopfliPlugin = require('zopfli-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackZopfliPlugin {
  plugin: ZopfliPlugin;
  constructor() {
    this.plugin = new ZopfliPlugin({
      asset: '[path].gz[query]',
      algorithm: 'zopfli',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    });
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
