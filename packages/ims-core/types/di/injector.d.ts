import { Type } from '../type';
import { InjectionToken } from './injection_token';
import { StaticProvider } from './provider';
import { Observable } from 'ims-rxjs';
export declare class NullInjector implements Injector {
    get(token: any, notFoundValue?: any): any;
    set(providers: StaticProvider | StaticProvider[]): any;
    init(): Promise<void>;
    when(tokens: any): Observable<Record[]>;
}
export declare enum InjectFlags {
    Default = 0,
    Host = 1,
    Self = 2,
    SkipSelf = 4,
    Optional = 8
}
export declare const INJECTOR: InjectionToken<Injector>;
export declare abstract class Injector {
    static THROW_IF_NOT_FOUND: {};
    static NULL: Injector;
    static top: Injector;
    static isNull(val: any): boolean;
    static createNull<T>(): T;
    constructor();
    abstract when(tokens: any): Observable<Record[]>;
    abstract set(providers: StaticProvider | StaticProvider[]): void;
    abstract get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    abstract get<T>(token: any, notFoundValue?: any): T;
    static create(providers: StaticProvider[], parent?: Injector): Injector;
    static create(options: {
        providers: StaticProvider[];
        parent?: Injector;
        name?: string;
    }): Injector;
    static ngInjectableDef: never;
}
export declare class StaticInjector implements Injector {
    private providers;
    readonly parent: Injector;
    readonly source: string | null;
    _records: Map<any, Record>;
    constructor(providers: StaticProvider[], parent?: Injector, source?: string | null);
    private loaded;
    private getCurrent;
    private getLoaded;
    when(token: any): Observable<Record[]>;
    private emit;
    private processProviders;
    set(providers: StaticProvider | StaticProvider[]): void;
    get(token: any, notFoundValue?: any, flags?: InjectFlags): Promise<any>;
    toString(): string;
}
interface Record {
    fn: Function;
    useNew: boolean;
    useCache?: boolean;
    deps: DependencyRecord[];
    value: any;
}
interface DependencyRecord {
    token: any;
    options: number;
}
export declare const SOURCE = "__source";
export interface InjectorListener {
    (provider: any): any;
}
export declare const USE_VALUE: string;
export {};
