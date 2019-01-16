import ClosureCompilerPlugin = require('closure-webpack-plugin');
import { Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackClosureCompilerPlugin {
  plugin: ClosureCompilerPlugin;
  constructor() {
    this.plugin = new ClosureCompilerPlugin(
      { mode: 'STANDARD' },
      {
        // compiler flags here
        //
        // for debuging help, try these:
        //
        // formatting: 'PRETTY_PRINT'
        // debug: true
      },
    );
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
