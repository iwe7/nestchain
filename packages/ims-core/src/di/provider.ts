import { Type, isType } from '../type';
import { InjectionToken } from './injection_token';
export type Key = string | Symbol;
export type ProviderKey<T> = InjectionToken<T> | Type<T> | Key;
export type AnyPromiseFunction<T> = (...args: any[]) => Promise<T>;
export type AnyPromiseFunctionOrAny<T> = AnyPromiseFunction<T> | T;
export type AnyPromiseFunctionOrTypeAny<T> =
  | AnyPromiseFunction<Type<T>>
  | Type<T>;

/**
 * value
 */
export interface ValueSansProvider<T> {
  useValue: AnyPromiseFunctionOrAny<T>;
}
export interface ValueProvider<T> extends ValueSansProvider<T> {
  provide: ProviderKey<T>;
  multi?: boolean;
}

/**
 * static class
 */
export interface StaticClassSansProvider<T> {
  useClass: AnyPromiseFunctionOrTypeAny<T>;
  deps: any[];
}

export interface StaticClassProvider<T> extends StaticClassSansProvider<T> {
  provide: ProviderKey<T>;
  multi?: boolean;
}

/**
 * constructor
 */
export interface ConstructorSansProvider {
  deps?: any[];
}

export interface ConstructorProvider<T> extends ConstructorSansProvider {
  provide: AnyPromiseFunctionOrTypeAny<T>;
  multi?: boolean;
}

export interface ExistingSansProvider<T> {
  useExisting: AnyPromiseFunctionOrAny<T>;
}

export interface ExistingProvider<T> extends ExistingSansProvider<T> {
  provide: ProviderKey<T>;
  multi?: boolean;
}
export interface FactorySansProvider<T> {
  useFactory: AnyPromiseFunction<T>;
  deps?: any[];
}

export interface FactoryProvider<T> extends FactorySansProvider<T> {
  provide: ProviderKey<T>;
  multi?: boolean;
}

export interface TypeProvider<T> extends Type<T> {}
export interface ClassSansProvider<T> {
  useClass: AnyPromiseFunctionOrTypeAny<T>;
}

export interface ClassProvider<T> extends ClassSansProvider<T> {
  provide: ProviderKey<T>;
  multi?: boolean;
}

export type Provider<T = any> =
  | TypeProvider<T> // no
  | ValueProvider<T>
  | ClassProvider<T> // no
  | ConstructorProvider<T>
  | ExistingProvider<T>
  | FactoryProvider<T>;

export type StaticProvider<T = any> =
  | ValueProvider<T>
  | ExistingProvider<T>
  | StaticClassProvider<T>
  | ConstructorProvider<T>
  | FactoryProvider<T>
  | any[];

export function isTypeProvider<T>(val: any): val is TypeProvider<T> {
  return isType(val);
}

export function isValueProvider<T>(val: any): val is ValueProvider<T> {
  return Reflect.has(val, 'useValue') && Reflect.has(val, 'provide');
}

export function isClassProvider<T>(val: any): val is ClassProvider<T> {
  return Reflect.has(val, 'useClass') && Reflect.has(val, 'provide');
}
export function isConstructorProvider<T>(
  val: any,
): val is ConstructorProvider<T> {
  return Reflect.has(val, 'provide');
}
export function isExistingProvider<T>(val: any): val is ExistingProvider<T> {
  return Reflect.has(val, 'provide') && Reflect.has(val, 'useExisting');
}
export function isFactoryProvider<T>(val: any): val is FactoryProvider<T> {
  return Reflect.has(val, 'provide') && Reflect.has(val, 'useFactory');
}
