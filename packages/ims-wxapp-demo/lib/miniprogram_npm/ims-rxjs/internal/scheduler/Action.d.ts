import { Scheduler } from '../Scheduler';
import { Subscription } from '../Subscription';
import { SchedulerAction } from '../types';
export declare class Action<T> extends Subscription {
    constructor(scheduler: Scheduler, work: (this: SchedulerAction<T>, state?: T) => void);
    schedule(state?: T, delay?: number): Subscription;
}
