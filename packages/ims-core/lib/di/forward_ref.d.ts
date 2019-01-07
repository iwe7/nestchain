import { Type } from '../type';
export interface ForwardRefFn {
    (): any;
}
export declare function forwardRef(forwardRefFn: ForwardRefFn): Type<any>;
export declare function resolveForwardRef<T>(type: T): T;
