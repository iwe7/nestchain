declare const _global: {
    [name: string]: any;
};
export declare function getGlobal<T>(key?: any): T;
export declare function setGlobal(key: string, value: any): void;
export { _global as global };
