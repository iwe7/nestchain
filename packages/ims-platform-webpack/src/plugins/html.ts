import HTMLPlugin = require('html-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackHtmlPlugin {
  plugin: HTMLPlugin;
  constructor() {
    this.plugin = new HTMLPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
