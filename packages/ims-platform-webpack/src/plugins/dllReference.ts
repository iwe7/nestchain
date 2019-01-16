import { DllReferencePlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackDllReferencePlugin {
  plugin: DllReferencePlugin;
  constructor() {
    this.plugin = new DllReferencePlugin({
      context: '',
      manifest: '',
    });
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
