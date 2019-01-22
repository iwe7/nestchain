import { MetadataFactory, ClassMetadata } from '../decorator';
import { Provider, StaticProvider } from './provider';
import { Type } from '../type';
import { LifeSubject } from '../util';
import { InjectionToken } from './injection_token';
export declare class NgModuleMetadataFactory extends MetadataFactory {
    staticProviderMap: Map<StaticProvider, StaticProvider>;
    type(life: LifeSubject, def: ClassMetadata<NgModule>): any;
    private handlerImport;
    private handlerImports;
}
export declare function providerToStaticProvider(provider: Provider): StaticProvider;
export interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
}
export declare function isModuleWithProviders<T = any>(val: any): val is ModuleWithProviders<T>;
export declare type NgModuleImportType = Type<any> | ModuleWithProviders<{}> | NgModuleImport | any[];
export interface NgModuleImports {
    (): Promise<Array<NgModuleImportType>>;
}
export interface NgModuleImport {
    (): Promise<NgModuleImportType>;
}
export interface NgModule {
    providers?: Provider[];
    imports?: Array<NgModuleImportType> | NgModuleImports;
    controllers?: any[];
}
export declare const NgModuleToken: InjectionToken<MetadataFactory>;
export declare const NgModule: import("../decorator/makeDecorator").IDecorator<NgModule>;
export declare const ImsModule: import("../decorator/makeDecorator").IDecorator<NgModule>;
