import { BehaviorSubject } from 'ims-rxjs';
export interface TypeEvent<T = any> {
    type?: 'init' | 'add' | 'delete' | 'update' | 'call';
    state?: 'start' | 'runing' | 'end';
    payload?: T;
}
export declare class LifeSubject<T = any> extends BehaviorSubject<TypeEvent<T>> {
    constructor();
    next(val: TypeEvent<T>): void;
}
