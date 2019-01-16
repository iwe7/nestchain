import ExtractTextPlugin = require('extract-text-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackExtractTextPlugin {
  plugin: ExtractTextPlugin;
  constructor() {
    this.plugin = new ExtractTextPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
