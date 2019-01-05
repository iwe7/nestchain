import { makeDecorator, TypeDecorator } from 'ims-decorator';
import { Provider } from './provider';
import { Type } from '../type';
export interface ModuleWithProviders<T = any> {
  ngModule: Type<T>;
  providers?: Provider[];
}
export interface NgModule {
  providers?: Provider[];
  imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
  exports?: Array<Type<any> | any[]>;
}
export interface NgModuleDecorator {
  (obj?: NgModule): TypeDecorator;
  new (obj?: NgModule): NgModule;
}
export const NgModule: NgModuleDecorator = makeDecorator(
  'NgModule',
  'visitNgModule',
);
