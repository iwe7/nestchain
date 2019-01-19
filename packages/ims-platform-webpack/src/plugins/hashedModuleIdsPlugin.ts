import { HashedModuleIdsPlugin, Compiler, compilation } from 'webpack';
import { Injectable, MultihashType } from 'ims-core';
import { Multihashing } from 'ims-multihash';

@Injectable({
  providedIn: 'root',
})
export class ImsWebpackHashedModuleIdsPlugin {
  plugin: HashedModuleIdsPlugin;
  options: any;
  constructor(public hash: Multihashing) {
    this.plugin = new HashedModuleIdsPlugin();
    this.options = (this.plugin as any).options;
  }

  apply(compiler: Compiler) {
    const options = this.options;
    compiler.hooks.compile.tap('HashedModuleIdsPlugin', (opt: CompileOpt) => {
      let {
        compilationDependencies,
        contextModuleFactory,
        normalModuleFactory,
      } = opt;
      normalModuleFactory.hooks.factory.tap(
        'HashedModuleIdsPlugin',
        (...args) => {
          // console.log('factory', args);
        },
      );
      normalModuleFactory.hooks.resolver.tap(
        'HashedModuleIdsPlugin',
        (...args) => {
          // console.log('resolver', args);
        },
      );
      normalModuleFactory.hooks.createModule.tap(
        'HashedModuleIdsPlugin',
        ({ parser }) => {
          // console.log('createModule', parser);
        },
      );
      // console.log('compile', opt);
    });
  }
}

export interface CompileOpt {
  compilationDependencies: Set<any>;
  contextModuleFactory: compilation.ContextModuleFactory;
  normalModuleFactory: compilation.NormalModuleFactory;
}
