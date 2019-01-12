export abstract class Comparator<A, B = A> {
  compare: (a: A, b: B) => -1 | 0 | 1;
  abstract equal(a: A, b: B): boolean;
  abstract lessThan(a: A, b: B): boolean;
  abstract greaterThan(a: A, b: B): boolean;
  abstract lessThanOrEqual(a: A, b: B): boolean;
  abstract greaterThanOrEqual(a: A, b: B): boolean;
  abstract reverse(): void;
}
