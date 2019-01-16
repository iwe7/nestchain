import { LoaderOptionsPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackLoaderOptionsPlugin {
  plugin: LoaderOptionsPlugin;
  constructor() {
    this.plugin = new LoaderOptionsPlugin('');
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
