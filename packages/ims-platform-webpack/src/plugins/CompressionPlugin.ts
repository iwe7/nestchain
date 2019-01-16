import CompressionPlugin = require('compression-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackCompressionPlugin {
  plugin: CompressionPlugin;
  constructor() {
    this.plugin = new CompressionPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
