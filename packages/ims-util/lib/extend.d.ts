import { Type } from './type';
export declare function extend<T, U>(target: Type<T>, source1: Type<U>): Type<T & U>;
export declare function extend<T, U, V>(target: Type<T>, source1: Type<U>, source2: Type<V>): Type<T & U & V>;
export declare function extend<T, U, V, W>(target: Type<T>, source1: Type<U>, source2: Type<V>, source3: Type<W>): Type<T & U & V & W>;
export declare function extend<T, U, V, W, X>(target: Type<T>, source1: Type<U>, source2: Type<V>, source3: Type<W>, source4: Type<W>): Type<T & U & V & W & X>;
export declare function extend<T, U, V, W, X, Y>(target: Type<T>, source1: Type<U>, source2: Type<V>, source3: Type<W>, source4: Type<W>, source5: Type<W>): Type<T & U & V & W & X & Y>;
export declare function extend<T, U, V, W, X, Y, Z>(target: Type<T>, source1: Type<U>, source2: Type<V>, source3: Type<W>, source4: Type<W>, source5: Type<W>, source6: Type<W>): Type<T & U & V & W & X & Y & Z>;
export declare function mixin<U, V>(Target: Type<any>, Super: Type<any>): Type<U & V>;
