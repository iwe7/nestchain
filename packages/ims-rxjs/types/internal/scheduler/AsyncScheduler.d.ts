import { Scheduler } from '../Scheduler';
import { Action } from './Action';
import { AsyncAction } from './AsyncAction';
import { SchedulerAction } from '../types';
import { Subscription } from '../Subscription';
export declare class AsyncScheduler extends Scheduler {
    static delegate?: Scheduler;
    actions: Array<AsyncAction<any>>;
    active: boolean;
    scheduled: any;
    constructor(SchedulerAction: typeof Action, now?: () => number);
    schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
    flush(action: AsyncAction<any>): void;
}
