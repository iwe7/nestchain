import { InjectionToken } from 'ims-core';
export declare abstract class ImsBinBase {
    abstract match(s: string, ...args: any[]): boolean;
    abstract run(): any;
}
export declare const ImsBinToken: InjectionToken<ImsBinBase[]>;
