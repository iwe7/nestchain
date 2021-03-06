import { Type } from '../type';
export declare class InjectionToken<T> {
    protected _desc: string;
    readonly notFound?: T;
    readonly ngMetadataName = "InjectionToken";
    readonly ngInjectableDef: never | undefined;
    constructor(_desc: string, notFound?: T, options?: {
        providedIn?: Type<any> | 'root' | null;
        factory: () => T;
    });
    toString(): string;
}
export interface InjectableDefToken<T> extends InjectionToken<T> {
    ngInjectableDef: never;
}
