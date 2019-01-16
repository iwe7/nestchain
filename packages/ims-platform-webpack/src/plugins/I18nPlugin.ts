import I18nPlugin = require('i18n-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackI18nPlugin {
  plugin: I18nPlugin;
  constructor() {
    this.plugin = new I18nPlugin();
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
