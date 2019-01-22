import { Type } from '../type';
import { Injector } from './injector';
import { StaticProvider } from './provider';
export declare class ImsRef<T> {
    readonly injector: Injector;
    readonly instance: T;
    constructor(injector: Injector, instance: T);
    onDestroy(callback: Function): void;
}
export declare const symbolGetProviders: unique symbol;
export declare const symbolGetFactory: unique symbol;
export declare function createImsFactory<T>(type: any): ImsFactory<T>;
export declare function createImsProviders(type: any, injector?: Injector): Promise<StaticProvider[]>;
export declare class ImsFactory<T> {
    readonly type: Type<T>;
    [symbolGetProviders]: (injector: Injector) => Promise<StaticProvider[]>;
    constructor(type: Type<T>, getProviders: (injector: Injector) => Promise<StaticProvider[]>);
    create(parentInjector?: Injector): Promise<ImsRef<T>>;
}
