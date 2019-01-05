import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { Type } from 'ims-core';

export const NgModuleMetadataKey = 'NgModuleMetadataKey';
export interface NgModuleTransitiveScopes {
  compilation: { directives: Set<any>; pipes: Set<any> };
  exported: { directives: Set<any>; pipes: Set<any> };
}
export class NgModuleRef<T> {
  type: T;
  bootstrap: Type<any>[];
  declarations: Type<any>[];
  imports: Type<any>[];
  exports: Type<any>[];
  transitiveCompileScopes: NgModuleTransitiveScopes | null;
}
export abstract class NgModuleFactory {
  abstract create<T>(): NgModuleRef<T>;
}
export interface NgModuleOptions {}
export interface NgModuleDecorator {
  (opt: NgModuleOptions): TypeDecorator;
}
export const NgModule = makeDecorator(
  NgModuleMetadataKey,
  'visitNgModule',
  dir => dir,
);

export function createNgModuleFactory(
  ngModuleType: Type<any>,
  bootstrapComponents: Type<any>[],
  defFactory: NgModuleDefinitionFactory,
): NgModuleFactory {}

export class NgModuleDefinitionFactory extends DefinitionFactory<
  NgModuleDefinitionFactory
> {}
