import { DllPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackDllPlugin {
  plugin: DllPlugin;
  constructor() {
    this.plugin = new DllPlugin({
      name: '',
      path: '',
    });
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
