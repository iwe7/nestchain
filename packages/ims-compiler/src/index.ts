export abstract class ImsCompiler {
  abstract compileComponent(path: string): any;
  /**
   * 编译
   */
  abstract compile(): any;
  /**
   * 编译wxml
   */
  abstract compileWxml(): any;
  /**
   * 编译wxss
   */
  abstract compileWxss(): any;
  /**
   * 编译js
   */
  abstract compileJs(): any;
  /**
   * 编译json
   */
  abstract compileJson(): any;
  /**
   * 编译node
   */
  abstract compileNode(): any;
}

export abstract class ImsCompilerFactory {
  abstract create(): ImsCompiler;
}

export class ImsCompilerImpl extends ImsCompiler {
  compileComponent(path: string) {}
  compile(): any {}
  compileWxml(): any {}
  compileWxss(): any {}
  compileJs(): any {}
  compileJson(): any {}
  compileNode(): any {}
}

export class ImsCompilerFactoryImpl extends ImsCompilerFactory {
  create(): ImsCompiler {
    return new ImsCompilerImpl();
  }
}

let compilerFactory = new ImsCompilerFactoryImpl();
let compiler = compilerFactory.create();
compiler.compileComponent(join(__dirname, 'test/index'));

import { join } from 'path';
