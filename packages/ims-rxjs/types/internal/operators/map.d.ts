import { Operator } from '../Operator';
import { Subscriber } from '../Subscriber';
import { OperatorFunction } from '../types';
export declare function map<T, R>(project: (value: T, index: number) => R, thisArg?: any): OperatorFunction<T, R>;
export declare class MapOperator<T, R> implements Operator<T, R> {
    private project;
    private thisArg;
    constructor(project: (value: T, index: number) => R, thisArg: any);
    call(subscriber: Subscriber<R>, source: any): any;
}
