import NpmInstallPlugin = require('npm-install-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackNpmInstallPlugin {
  plugin: NpmInstallPlugin;
  constructor() {
    this.plugin = new NpmInstallPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
