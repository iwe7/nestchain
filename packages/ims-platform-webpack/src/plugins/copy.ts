import CopyPlugin = require('copy-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackCopyPlugin {
  plugin: CopyPlugin;
  constructor() {
    this.plugin = new CopyPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
