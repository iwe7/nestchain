import { Type } from 'ims-core';
export interface IWithIs {
    className: string;
    symbolName: string;
}
export declare function withIs<T>(Class: Type<any>, symbolName: string): Type<T> & {
    is(obj: any): boolean;
};
