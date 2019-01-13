import { StaticProvider } from './di/provider';
export abstract class Compiler {
  abstract compile(type: any): StaticProvider[];
}

export abstract class CompilerFactory {
  abstract create(): Compiler;
}
