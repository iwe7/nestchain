export declare const Type: FunctionConstructor;
export interface Type<T extends Object> extends Function {
    new (...args: any[]): T;
}
export declare type ObjectType<T> = {
    new (): T;
} | Function;
export interface ObjectLiteral {
    [key: string]: any;
}
export declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export declare function isType<T = any>(v: any): v is Type<T>;
export declare type Mutable<T extends {
    [x: string]: any;
}, K extends string> = {
    [P in K]: T[P];
};
export declare type IInjector<T = any> = Type<T>[] | {
    [key: string]: Type<T>;
};
export declare function iInjectorToArray(injector: IInjector): any[];
