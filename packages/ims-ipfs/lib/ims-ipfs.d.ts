export declare class ImsIpfs {
    node: any;
    constructor(options?: any);
    id(fn: (err: Error, identify: any) => any): any;
    on(type: string, fn: (...args: any[]) => any): any;
    stop(fn: (err: Error) => any): any;
}
