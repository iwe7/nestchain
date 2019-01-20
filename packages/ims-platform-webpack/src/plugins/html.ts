import HTMLPlugin = require('html-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable, Injector, SourceRoot } from 'ims-core';
import { join } from 'path';
import { ROOT } from 'ims-const';

@Injectable({
  providedIn: 'root',
  useFactory: (injector: Injector) => {
    return new ImsWebpackHtmlPlugin();
  },
  deps: [Injector],
})
export class ImsWebpackHtmlPlugin {
  plugin: HTMLPlugin;
  constructor() {}

  async apply(compiler: Compiler) {
    this.plugin = new HTMLPlugin({
      cache: false,
      title: 'app title',
      filename: 'index.html',
      hash: false,
      meta: {},
      template: join(ROOT, 'src/demo/index.html'),
    });
    return this.plugin.apply(compiler);
  }
}
