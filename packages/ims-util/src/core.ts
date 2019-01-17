import { isArray } from 'util';

export function orderedRemoveItemAt<T>(array: T[], index: number): void {
  // This seems to be faster than either `array.splice(i, 1)` or `array.copyWithin(i, i+ 1)`.
  for (let i = index; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  array.pop();
}

export function orderedRemoveItem<T>(array: T[], item: T): boolean {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      orderedRemoveItemAt(array, i);
      return true;
    }
  }
  return false;
}

export interface Pattern {
  prefix: string;
  suffix: string;
}

export function patternText({ prefix, suffix }: Pattern): string {
  return `${prefix}*${suffix}`;
}

export function matchedText(pattern: Pattern, candidate: string): string {
  return candidate.substring(
    pattern.prefix.length,
    candidate.length - pattern.suffix.length,
  );
}

export function startsWith(str: string, prefix: string): boolean {
  return str.lastIndexOf(prefix, 0) === 0;
}

export function removePrefix(str: string, prefix: string): string {
  return startsWith(str, prefix) ? str.substr(prefix.length) : str;
}

export type GetCanonicalFileName = (fileName: string) => string;
export function tryRemovePrefix(
  str: string,
  prefix: string,
  getCanonicalFileName: GetCanonicalFileName = identity,
): string | undefined {
  return startsWith(getCanonicalFileName(str), getCanonicalFileName(prefix))
    ? str.substring(prefix.length)
    : undefined;
}

export function identity<T>(x: T) {
  return x;
}
export function notImplemented(): never {
  throw new Error('Not implemented');
}

/** Does nothing. */
export function noop(_?: {} | null | undefined): void {} // tslint:disable-line no-empty

/** Do nothing and return false */
export function returnFalse(): false {
  return false;
}

/** Do nothing and return true */
export function returnTrue(): true {
  return true;
}

export function toArray<T>(value: T | T[]): T[];
export function toArray<T>(value: T | ReadonlyArray<T>): ReadonlyArray<T>;
export function toArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value];
}

export type AnyFunction = (...args: never[]) => void;
export type AnyConstructor = new (...args: unknown[]) => unknown;

export function equateValues<T>(a: T, b: T) {
  return a === b;
}

export function equateStringsCaseInsensitive(a: string, b: string) {
  return (
    a === b ||
    (a !== undefined && b !== undefined && a.toUpperCase() === b.toUpperCase())
  );
}

export function equateStringsCaseSensitive(a: string, b: string) {
  return equateValues(a, b);
}

/* @internal */
export type EqualityComparer<T> = (a: T, b: T) => boolean;

/* @internal */
export type Comparer<T> = (a: T, b: T) => Comparison;

/* @internal */
export const enum Comparison {
  LessThan = -1,
  EqualTo = 0,
  GreaterThan = 1,
}

function compareComparableValues(
  a: string | undefined,
  b: string | undefined,
): Comparison;
function compareComparableValues(
  a: number | undefined,
  b: number | undefined,
): Comparison;
function compareComparableValues(
  a: string | number | undefined,
  b: string | number | undefined,
) {
  return a === b
    ? Comparison.EqualTo
    : a === undefined
    ? Comparison.LessThan
    : b === undefined
    ? Comparison.GreaterThan
    : a < b
    ? Comparison.LessThan
    : Comparison.GreaterThan;
}

export function compareValues(
  a: number | undefined,
  b: number | undefined,
): Comparison {
  return compareComparableValues(a, b);
}

export function min<T>(a: T, b: T, compare: Comparer<T>): T {
  return compare(a, b) === Comparison.LessThan ? a : b;
}

export function compareStringsCaseInsensitive(a: string, b: string) {
  if (a === b) return Comparison.EqualTo;
  if (a === undefined) return Comparison.LessThan;
  if (b === undefined) return Comparison.GreaterThan;
  a = a.toUpperCase();
  b = b.toUpperCase();
  return a < b
    ? Comparison.LessThan
    : a > b
    ? Comparison.GreaterThan
    : Comparison.EqualTo;
}

export function compareStringsCaseSensitive(
  a: string | undefined,
  b: string | undefined,
): Comparison {
  return compareComparableValues(a, b);
}

export function getStringComparer(ignoreCase?: boolean) {
  return ignoreCase
    ? compareStringsCaseInsensitive
    : compareStringsCaseSensitive;
}

export function compareProperties<T, K extends keyof T>(
  a: T | undefined,
  b: T | undefined,
  key: K,
  comparer: Comparer<T[K]>,
): Comparison {
  return a === b
    ? Comparison.EqualTo
    : a === undefined
    ? Comparison.LessThan
    : b === undefined
    ? Comparison.GreaterThan
    : comparer(a[key], b[key]);
}

export function compareBooleans(a: boolean, b: boolean): Comparison {
  return compareValues(a ? 1 : 0, b ? 1 : 0);
}

export function endsWith(str: string, suffix: string) {
  const expectedPos = str.length - suffix.length;
  return expectedPos >= 0 && str.indexOf(suffix, expectedPos) === expectedPos;
}

export function removeSuffix(str: string, suffix: string): string {
  return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : str;
}

export function tryRemoveSuffix(
  str: string,
  suffix: string,
): string | undefined {
  return endsWith(str, suffix)
    ? str.slice(0, str.length - suffix.length)
    : undefined;
}

export function stringContains(str: string, substring: string): boolean {
  return str.indexOf(substring) !== -1;
}

export function fileExtensionIs(path: string, extension: string): boolean {
  return path.length > extension.length && endsWith(path, extension);
}

export function fileExtensionIsOneOf(
  path: string,
  extensions: ReadonlyArray<string>,
): boolean {
  for (const extension of extensions) {
    if (fileExtensionIs(path, extension)) {
      return true;
    }
  }
  return false;
}

/**
 * Takes a string like "jquery-min.4.2.3" and returns "jquery"
 */
export function removeMinAndVersionNumbers(fileName: string) {
  // Match a "." or "-" followed by a version number or 'min' at the end of the name
  const trailingMinOrVersion = /[.-]((min)|(\d+(\.\d+)*))$/;

  // The "min" or version may both be present, in either order, so try applying the above twice.
  return fileName
    .replace(trailingMinOrVersion, '')
    .replace(trailingMinOrVersion, '');
}
