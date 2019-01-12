import { Subscription } from './Subscription';
import { SchedulerLike, SchedulerAction } from './types';

export abstract class Scheduler implements SchedulerLike {
  abstract now: () => number;
  abstract schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay: number,
    state?: T,
  ): Subscription;
}
