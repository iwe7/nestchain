import { EvalSourceMapDevToolPlugin, Compiler } from 'webpack';
import { Injectable } from 'ims-core';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackEvalSourceMapDevToolPlugin {
  plugin: EvalSourceMapDevToolPlugin;
  constructor() {
    this.plugin = new EvalSourceMapDevToolPlugin({});
  }

  apply(compiler: Compiler) {
    return this.plugin.apply(compiler);
  }
}
