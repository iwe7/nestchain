export declare const Type: FunctionConstructor;
export interface Type<T extends Object> extends Function {
    new (...args: any[]): T;
}
export declare function isType<T = any>(v: any): v is Type<T>;
export interface MapLike<T> {
    [index: string]: T;
}
