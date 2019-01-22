export declare function getClosureSafeProperty<T>(objWithPropertyToExtract: T): string;
export declare function stringify(token: any): string;
export declare function isFunction(val: any): val is Function;
export declare function isNumber(val: any): val is number;
export declare function isUndefined(val: any): val is undefined;
export declare function isArray(val: any): val is Array<any>;
export declare function isPromise<T = any>(v: any): v is Promise<T>;
export declare function staticError(text: string, obj: any): Error;
export declare function formatError(text: string, obj: any, source?: string | null): string;
export declare function toFrom(val: any, path?: PropertyKey): any;
export declare class ObservableData {
    _path: any;
    value: any;
    parent: ObservableData;
    constructor(_path: any, value: any, parent?: ObservableData);
    getValue(): any;
    getPath(): any[];
    createChild(path: any, value: any): ObservableData;
}
