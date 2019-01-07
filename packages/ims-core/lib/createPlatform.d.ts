import { StaticProvider } from './di/provider';
import { InjectionToken } from './di/injection_token';
import { Injector } from './di/injector';
import { Type } from './type';
import { Observable } from 'rxjs';
import { NgModuleRef, NgModuleFactory } from './di/ngModule';
export declare class PlatformRef {
    _injector: Injector;
    private _modules;
    readonly destroyed: boolean;
    readonly injector: Injector;
    constructor(_injector: Injector);
    bootstrapModule<M>(moduleType: Type<M>): Observable<NgModuleRef<M>>;
    bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Observable<NgModuleRef<M>>;
}
export declare const ALLOW_MULTIPLE_PLATFORMS: InjectionToken<boolean>;
export declare const PLATFORM_INITIALIZER: InjectionToken<(() => void)[]>;
export declare const PLATFORM_ID: InjectionToken<Object>;
export declare function createPlatform(injector: Injector): PlatformRef;
export declare function getPlatform(): PlatformRef | null;
export interface PlatformFactory {
    (extraProviders?: StaticProvider[]): PlatformRef;
}
export declare function createPlatformFactory(parentPlatformFactory: PlatformFactory | null, name: string, providers?: StaticProvider[], types?: Type<any>[]): (extraProviders?: StaticProvider[]) => PlatformRef;
export declare function assertPlatform(requiredToken: any): PlatformRef;
