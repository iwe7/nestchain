import { makeDecorator, TypeDecorator } from '../makeDecorator';
import { IInjector } from 'ims-core';
export const ModuleMetadataKey = 'ModuleMetadataKey';
export interface ModuleOptions {
  deps: IInjector;
}
export interface ModuleDecorator {
  (opt: ModuleOptions): TypeDecorator;
}
export const Module: ModuleDecorator = makeDecorator(
  ModuleMetadataKey,
  'visitModule',
);
