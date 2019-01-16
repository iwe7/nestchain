import { Parser } from 'acorn';
import { Injectable } from 'ims-core';
import * as ESTree from 'estree';

@Injectable({
  providedIn: 'root',
})
export class ImsAcorn {
  parse(code: string, options?: any): ESTree.Program {
    const type = options ? options.sourceType : 'module';
    const parserOptions = Object.assign(
      Object.create(null),
      defaultParserOptions,
      options,
    );
    if (type === 'auto') {
      parserOptions.sourceType = 'module';
    }
    let ast;
    let error;
    let threw = false;
    try {
      ast = new Parser(parserOptions, code).parse();
    } catch (e) {
      error = e;
      threw = true;
    }

    if (threw && type === 'auto') {
      parserOptions.sourceType = 'script';
      if (Array.isArray(parserOptions.onComment)) {
        parserOptions.onComment.length = 0;
      }
      try {
        ast = new Parser(parserOptions, code).parse();
        threw = false;
      } catch (e) {
        threw = true;
      }
    }
    if (threw) {
      throw error;
    }
    return ast;
  }
}

const defaultParserOptions = {
  ranges: true,
  locations: true,
  ecmaVersion: 2019,
  sourceType: 'module',
  onComment: null,
};
