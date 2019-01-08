import { Type } from '../type';
import { InjectionToken } from './injection_token';
import { StaticProvider } from './provider';
export declare class NullInjector implements Injector {
    get(token: any, notFoundValue?: any): any;
    set(providers: StaticProvider[]): any;
}
export declare enum InjectFlags {
    Default = 0,
    Host = 1,
    Self = 2,
    SkipSelf = 4,
    Optional = 8
}
export declare const INJECTOR: InjectionToken<Injector>;
export declare class StaticInjector implements Injector {
    readonly parent: Injector;
    readonly source: string | null;
    private _records;
    constructor(providers: StaticProvider[], parent?: Injector, source?: string | null);
    set(providers: StaticProvider[]): void;
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    get(token: any, notFoundValue?: any): any;
    toString(): string;
}
export declare abstract class Injector {
    static THROW_IF_NOT_FOUND: Object;
    static NULL: Injector;
    static top: Injector;
    abstract set(providers: StaticProvider[]): any;
    abstract get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    abstract get(token: any, notFoundValue?: any): any;
    static create(providers: StaticProvider[], parent?: Injector): Injector;
    static create(options: {
        providers: StaticProvider[];
        parent?: Injector;
        name?: string;
    }): Injector;
    static ngInjectableDef: never;
}
export declare const SOURCE = "__source";
export declare const USE_VALUE: string;
