import { Type } from '../type';
export declare const NG_INJECTOR_DEF: string;
export declare const NG_INJECTABLE_DEF: string;
import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, StaticClassProvider, ValueProvider } from './provider';
export interface InjectableDef<T> {
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    factory: () => T;
    value: T | undefined;
}
export interface InjectorDef<T = any> {
    factory: () => T;
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
    imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}
export interface InjectableType<T> extends Type<T> {
    ngInjectableDef: never;
}
export interface InjectorType<T> extends Type<T> {
    ngInjectorDef: never;
}
export interface InjectorTypeWithProviders<T = any> {
    ngModule: InjectorType<T>;
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
}
export declare function defineInjectable<T>(opts: {
    providedIn?: Type<any> | 'root' | 'any' | null;
    factory: () => T;
}): never;
export declare function defineInjector(options: {
    factory: () => any;
    providers?: any[];
    imports?: any[];
}): never;
export declare function getInjectableDef<T>(type: any): InjectableDef<T> | null;
export declare function getInjectorDef<T>(type: any): InjectorDef<T> | null;
