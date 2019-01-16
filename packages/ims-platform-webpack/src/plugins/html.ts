import HTMLPlugin = require('html-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable, Injector, SourceRoot } from 'ims-core';
import { join } from 'path';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackHtmlPlugin {
  plugin: HTMLPlugin;
  constructor(injector: Injector) {
    let sourceRoot = injector.get(SourceRoot, './');
    this.plugin = new HTMLPlugin({
      cache: false,
      title: 'app title',
      filename: 'index.html',
      hash: false,
      meta: {},
      template: join(sourceRoot, 'index.html'),
    });
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
