import { InjectionToken } from 'ims-core';
export interface Assert {
  fail(message?: string | Error): never;
  fail(
    actual: any,
    expected: any,
    message?: string | Error,
    operator?: string,
    stackStartFn?: Function,
  ): never;
  ok(value: any, message?: string | Error): void;
  equal(actual: any, expected: any, message?: string | Error): void;
  notEqual(actual: any, expected: any, message?: string | Error): void;
  deepEqual(actual: any, expected: any, message?: string | Error): void;
  notDeepEqual(actual: any, expected: any, message?: string | Error): void;
  strictEqual(actual: any, expected: any, message?: string | Error): void;
  notStrictEqual(actual: any, expected: any, message?: string | Error): void;
  deepStrictEqual(actual: any, expected: any, message?: string | Error): void;
  notDeepStrictEqual(
    actual: any,
    expected: any,
    message?: string | Error,
  ): void;
  throws(block: Function, message?: string | Error): void;
  throws(
    block: Function,
    error: RegExp | Function | Object | Error,
    message?: string | Error,
  ): void;
  doesNotThrow(block: Function, message?: string | Error): void;
  doesNotThrow(
    block: Function,
    error: RegExp | Function,
    message?: string | Error,
  ): void;
  ifError(value: any): void;
  rejects(
    block: Function | Promise<any>,
    message?: string | Error,
  ): Promise<void>;
  rejects(
    block: Function | Promise<any>,
    error: RegExp | Function | Object | Error,
    message?: string | Error,
  ): Promise<void>;
  doesNotReject(
    block: Function | Promise<any>,
    message?: string | Error,
  ): Promise<void>;
  doesNotReject(
    block: Function | Promise<any>,
    error: RegExp | Function,
    message?: string | Error,
  ): Promise<void>;
}
export const Assert = new InjectionToken<Assert>('assert');
