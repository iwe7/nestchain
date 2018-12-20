export interface TypeDecorator {
    (type: any): any;
    (target: any, propertyKey?: any, parameterIndex?: any): void;
}
interface DefaultOptionsFunction<T> {
    (...args: any[]): T;
}
export declare function makeDecorator<T = any>(metadataKey: string, visit: string, defaultOptions?: DefaultOptionsFunction<T>, typeFn?: (target: any, opt: any) => any, callback?: (target: any, opt: any) => any): (...args: any[]) => TypeDecorator;
export {};
