import { Action } from './scheduler/Action';
import { Subscription } from './Subscription';
import { SchedulerLike, SchedulerAction } from './types';
export declare class Scheduler implements SchedulerLike {
    private SchedulerAction;
    static now: () => number;
    constructor(SchedulerAction: typeof Action, now?: () => number);
    now: () => number;
    schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
}
