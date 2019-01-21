import { InjectionToken } from 'ims-core';
import schedule = require('node-schedule');

import { EventEmitter } from 'events';

/** The callback executed by a Job */
export type JobCallback = (fireDate: Date) => void;

/** Scheduler jobs. */
export interface Job extends EventEmitter {
  readonly name: string;

  /**
   * Use the function scheduleJob() to create new Job objects.
   *
   * @internal
   * @param name     either an optional name for this Job or this Job's callback
   * @param job      either this Job's callback or an optional callback function
   * @param callback optional callback that is executed right before the JobCallback
   */
  constructor(
    name: string | JobCallback,
    job?: JobCallback | (() => void),
    callback?: () => void,
  );

  /**
   * Adds an Invocation to this job. For internal use.
   * @internal
   * @return whether the invocation could be added
   */
  trackInvocation(invocation: Invocation): boolean;

  /**
   * removes an Invocation from this Job's tracking list. For internal use.
   * @internal
   * @return boolean whether the invocation was successful. Removing an Invocation that doesn't exist, returns false.
   */
  stopTrackingInvocation(invocation: Invocation): boolean;

  /**
   * @internal
   * @return the number of currently running instances of this Job.
   */
  triggeredJobs(): number;

  /**
   * set the number of currently running Jobs.
   * @internal
   */
  setTriggeredJobs(triggeredJobs: number): void;

  /**
   * cancel all pending Invocations of this Job.
   * @param reschedule whether to reschedule the canceled Invocations.
   */
  cancel(reschedule?: boolean): boolean;

  /**
   * cancel the next Invocation of this Job.
   * @param reschedule whether to reschedule the canceled Invocation.
   * @return whether cancelation was successful
   */
  cancelNext(reschedule?: boolean): boolean;

  /**
   * Changes the scheduling information for this Job.
   * @return whether the reschedule was successful
   */
  reschedule(spec: RecurrenceRule | string | number): boolean;

  /** The Date on which this Job will be run next. */
  nextInvocation(): Date;

  /** A list of all pending Invocations */
  pendingInvocations(): Invocation[];

  /**
   * run this Job immediately.
   */
  invoke(): void;

  /** schedule this Job to be run on the specified date. */
  runOnDate(date: Date): void;

  /** set scheduling information */
  schedule(date: Date | string | number): boolean;
}

export interface Range {
  constructor(start?: number, end?: number, step?: number);
  contains(value: number): boolean;
}

export type Recurrence = number | Range | string;
export type RecurrenceSegment = Recurrence | Recurrence[];

export interface RecurrenceRule {
  date: RecurrenceSegment;
  dayOfWeek: RecurrenceSegment;
  hour: RecurrenceSegment;
  minute: RecurrenceSegment;
  month: RecurrenceSegment;
  second: RecurrenceSegment;
  year: RecurrenceSegment;

  constructor(
    year?: RecurrenceSegment,
    month?: RecurrenceSegment,
    date?: RecurrenceSegment,
    dayOfWeek?: RecurrenceSegment,
    hour?: RecurrenceSegment,
    minute?: RecurrenceSegment,
    second?: RecurrenceSegment,
  );

  nextInvocationDate(base: Date): Date;
}

export interface RecurrenceSpecDateRange {
  start: Date | string | number;
  end: Date | string | number;
  rule: string;
}

export interface RecurrenceSpecObjLit {
  date?: RecurrenceSegment;
  dayOfWeek?: RecurrenceSegment;
  hour?: RecurrenceSegment;
  minute?: RecurrenceSegment;
  month?: RecurrenceSegment;
  second?: RecurrenceSegment;
  year?: RecurrenceSegment;
}

export interface Invocation {
  fireDate: Date;
  job: Job;
  recurrenceRule: RecurrenceRule;
  timerID: number;
  new (job: Job, fireDate: Date, recurrenceRule: RecurrenceRule): Invocation;
}

export interface Schedule {
  scheduleJob(
    name: string,
    rule:
      | RecurrenceRule
      | RecurrenceSpecDateRange
      | RecurrenceSpecObjLit
      | Date
      | string,
    callback: JobCallback,
  ): Job;
  scheduleJob(
    rule:
      | RecurrenceRule
      | RecurrenceSpecDateRange
      | RecurrenceSpecObjLit
      | Date
      | string,
    callback: JobCallback,
  ): Job;
  rescheduleJob(
    job: Job | string,
    spec:
      | RecurrenceRule
      | RecurrenceSpecDateRange
      | RecurrenceSpecObjLit
      | Date
      | string,
  ): Job;
  scheduledJobs: { [jobName: string]: Job };
  cancelJob(job: Job | string): boolean;
}
export const Schedule = new InjectionToken<Schedule>('schedule');
