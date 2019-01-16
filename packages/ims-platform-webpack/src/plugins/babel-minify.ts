import BabelMinifyPlugin = require('babel-minify-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackBabelMinifyPlugin {
  plugin: BabelMinifyPlugin;
  constructor() {
    this.plugin = new BabelMinifyPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
