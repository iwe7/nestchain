import { Type } from 'ims-core';
export interface TypeDecorator {
    (type: any): any;
    (target: any, propertyKey?: any, parameterIndex?: any): void;
}
interface DefaultOptionsFunction<T> {
    (...args: any[]): T;
}
export declare function makeDecorator<T = any>(metadataKey: string, visit: any, props?: DefaultOptionsFunction<T>, typeFn?: (type: Type<any>, meta: any) => any, parentClass?: Type<any>): any;
export {};
