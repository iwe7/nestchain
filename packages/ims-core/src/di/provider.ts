import { Type, isType } from '../type';
import { isFunction } from 'ims-util';
export interface ValueSansProvider {
  useValue: any;
}
export interface ValueProvider extends ValueSansProvider {
  provide: any;
  multi?: boolean;
}
export interface StaticClassSansProvider {
  useClass: Type<any>;
  deps: any[];
}
export interface StaticClassProvider extends StaticClassSansProvider {
  provide: any;
  multi?: boolean;
}

export interface ConstructorSansProvider {
  deps?: any[];
}

export interface ConstructorProvider extends ConstructorSansProvider {
  provide: Type<any>;
  multi?: boolean;
}

export interface ExistingSansProvider {
  useExisting: any;
}

export interface ExistingProvider extends ExistingSansProvider {
  provide: any;
  multi?: boolean;
}

export interface FactorySansProvider {
  useFactory: Function;
  deps?: any[];
  cache?: boolean;
}

export interface FactoryProvider extends FactorySansProvider {
  provide: any;
  multi?: boolean;
}

export interface TypeProvider extends Type<any> {}
export interface ClassSansProvider {
  useClass: Type<any>;
}

export interface ClassProvider extends ClassSansProvider {
  provide: any;
  multi?: boolean;
}

export type Provider =
  | TypeProvider // no
  | ValueProvider
  | ClassProvider // no
  | ConstructorProvider
  | ExistingProvider
  | FactoryProvider;
export interface StaticProviderFn {
  (): Promise<StaticProvider>;
}
export function isStaticProviderFn(val: any): val is StaticProviderFn {
  return isFunction(val);
}
export type StaticProvider =
  | ValueProvider
  | ExistingProvider
  | StaticClassProvider
  | ConstructorProvider
  | FactoryProvider
  | StaticProviderFn
  | any[];

export type StaticProvidersFunction = () => Promise<StaticProvider[]>;

export type StaticProviders = StaticProvidersFunction | StaticProvider[];

export function isTypeProvider(val: any): val is TypeProvider {
  return isType(val);
}

export function isValueProvider(val: any): val is ValueProvider {
  return Reflect.has(val, 'useValue') && Reflect.has(val, 'provide');
}

export function isClassProvider(val: any): val is ClassProvider {
  return Reflect.has(val, 'useClass') && Reflect.has(val, 'provide');
}
export function isConstructorProvider(val: any): val is ConstructorProvider {
  return Reflect.has(val, 'provide');
}
export function isExistingProvider(val: any): val is ExistingProvider {
  return Reflect.has(val, 'provide') && Reflect.has(val, 'useExisting');
}
export function isFactoryProvider(val: any): val is FactoryProvider {
  return Reflect.has(val, 'provide') && Reflect.has(val, 'useFactory');
}
