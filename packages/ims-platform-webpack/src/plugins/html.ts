import HTMLPlugin = require('html-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable, Injector, SourceRoot } from 'ims-core';
import { join } from 'path';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackHtmlPlugin {
  plugin: HTMLPlugin;
  constructor(private injector: Injector) {}

  async apply(compiler: Compiler) {
    let sourceRoot = await this.injector.get(SourceRoot, './');
    this.plugin = new HTMLPlugin({
      cache: false,
      title: 'app title',
      filename: 'index.html',
      hash: false,
      meta: {},
      template: join(sourceRoot, 'index.html'),
    });
    return this.plugin.apply(compiler);
  }
}
