import { Observable } from '../Observable';
import { ColdObservable } from './ColdObservable';
import { HotObservable } from './HotObservable';
import { TestMessage } from './TestMessage';
import { SubscriptionLog } from './SubscriptionLog';
import { VirtualTimeScheduler } from '../scheduler/VirtualTimeScheduler';
export interface RunHelpers {
    cold: typeof TestScheduler.prototype.createColdObservable;
    hot: typeof TestScheduler.prototype.createHotObservable;
    flush: typeof TestScheduler.prototype.flush;
    expectObservable: typeof TestScheduler.prototype.expectObservable;
    expectSubscriptions: typeof TestScheduler.prototype.expectSubscriptions;
}
export declare type observableToBeFn = (marbles: string, values?: any, errorValue?: any) => void;
export declare type subscriptionLogsToBeFn = (marbles: string | string[]) => void;
export declare class TestScheduler extends VirtualTimeScheduler {
    assertDeepEqual: (actual: any, expected: any) => boolean | void;
    readonly hotObservables: HotObservable<any>[];
    readonly coldObservables: ColdObservable<any>[];
    private flushTests;
    private runMode;
    constructor(assertDeepEqual: (actual: any, expected: any) => boolean | void);
    createTime(marbles: string): number;
    createColdObservable<T = string>(marbles: string, values?: {
        [marble: string]: T;
    }, error?: any): ColdObservable<T>;
    createHotObservable<T = string>(marbles: string, values?: {
        [marble: string]: T;
    }, error?: any): HotObservable<T>;
    private materializeInnerObservable;
    expectObservable(observable: Observable<any>, subscriptionMarbles?: string): ({
        toBe: observableToBeFn;
    });
    expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]): ({
        toBe: subscriptionLogsToBeFn;
    });
    flush(): void;
    static parseMarblesAsSubscriptions(marbles: string, runMode?: boolean): SubscriptionLog;
    static parseMarbles(marbles: string, values?: any, errorValue?: any, materializeInnerObservables?: boolean, runMode?: boolean): TestMessage[];
    run<T>(callback: (helpers: RunHelpers) => T): T;
}
