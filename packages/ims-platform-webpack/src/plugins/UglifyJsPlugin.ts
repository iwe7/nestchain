import UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackUglifyJsPlugin {
  plugin: UglifyJsPlugin;
  constructor() {
    this.plugin = new UglifyJsPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
