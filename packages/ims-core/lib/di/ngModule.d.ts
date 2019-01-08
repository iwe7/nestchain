import { TypeDecorator } from 'ims-decorator';
import { Provider, StaticProvider } from './provider';
import { Type } from '../type';
import { Injector } from './injector';
import { Observable } from 'ims-rxjs';
export interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
}
export declare function isModuleWithProviders<T = any>(val: any): val is ModuleWithProviders<T>;
export interface NgModule {
    providers?: Provider[];
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
}
export interface NgModuleDecorator {
    (obj?: NgModule): TypeDecorator;
    new (obj?: NgModule): NgModule;
}
export declare const NgModuleMetadataKey = "NgModuleMetadataKey";
export declare const NgModule: NgModuleDecorator;
export declare abstract class NgModuleRef<T> {
    abstract readonly injector: Injector;
    abstract readonly instance: T;
    abstract destroy(): void;
    abstract onDestroy(callback: () => void): void;
}
export interface InternalNgModuleRef<T> extends NgModuleRef<T> {
    _bootstrapComponents: Type<any>[];
}
export declare abstract class NgModuleFactory<T> {
    abstract readonly moduleType: Type<T>;
    abstract create(parentInjector: Injector | null): NgModuleRef<T>;
}
export declare function createNgModuleFactory(ngModuleType: Type<any>, injector: Injector): NgModuleFactory<any>;
export declare class NgModuleFactory_<T> extends NgModuleFactory<T> {
    private type;
    _injector?: Injector;
    readonly moduleType: Type<T>;
    private _moduleType;
    constructor(type: Type<any>, _injector?: Injector);
    create(parentInjector: Injector | null): NgModuleRef<T>;
}
export declare function getNgModuleStaticProvider(type: Type<any>): StaticProvider[];
export declare function providerToStaticProvider(provider: Provider): StaticProvider;
export declare class NgModuleRef_<T> extends NgModuleRef<T> {
    private _injector;
    private _instance;
    readonly injector: Injector;
    readonly instance: T;
    constructor(_injector: Injector, _instance: T);
    destroy(): void;
    onDestroy(callback: () => void): void;
}
export declare function compileNgModuleFactory<M>(injector: Injector, moduleType: Type<M>): Observable<NgModuleFactory<M>>;
