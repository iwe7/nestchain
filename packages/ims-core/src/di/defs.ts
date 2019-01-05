import { NG_INJECTABLE_DEF, NG_INJECTOR_DEF } from '../render3/fields';
import { Type } from '../type';

import {
  ClassProvider,
  ConstructorProvider,
  ExistingProvider,
  FactoryProvider,
  StaticClassProvider,
  ValueProvider,
} from './provider';

export interface InjectableDef<T> {
  providedIn: InjectorType<any> | 'root' | 'any' | null;
  factory: () => T;
  value: T | undefined;
}

export interface InjectorDef<T> {
  factory: () => T;
  providers: (
    | Type<any>
    | ValueProvider
    | ExistingProvider
    | FactoryProvider
    | ConstructorProvider
    | StaticClassProvider
    | ClassProvider
    | any[])[];

  imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}

export interface InjectableType<T> extends Type<T> {
  ngInjectableDef: never;
}
export interface InjectorType<T> extends Type<T> {
  ngInjectorDef: never;
}
export interface InjectorTypeWithProviders<T> {
  ngModule: InjectorType<T>;
  providers?: (
    | Type<any>
    | ValueProvider
    | ExistingProvider
    | FactoryProvider
    | ConstructorProvider
    | StaticClassProvider
    | ClassProvider
    | any[])[];
}

export function defineInjectable<T>(opts: {
  providedIn?: Type<any> | 'root' | 'any' | null;
  factory: () => T;
}): never {
  return ({
    providedIn: (opts.providedIn as any) || null,
    factory: opts.factory,
    value: undefined,
  } as InjectableDef<T>) as never;
}

export function defineInjector(options: {
  factory: () => any;
  providers?: any[];
  imports?: any[];
}): never {
  return ({
    factory: options.factory,
    providers: options.providers || [],
    imports: options.imports || [],
  } as InjectorDef<any>) as never;
}

export function getInjectableDef<T>(type: any): InjectableDef<T> | null {
  return type && type.hasOwnProperty(NG_INJECTABLE_DEF)
    ? (type as any)[NG_INJECTABLE_DEF]
    : null;
}

export function getInjectorDef<T>(type: any): InjectorDef<T> | null {
  return type && type.hasOwnProperty(NG_INJECTOR_DEF)
    ? (type as any)[NG_INJECTOR_DEF]
    : null;
}
