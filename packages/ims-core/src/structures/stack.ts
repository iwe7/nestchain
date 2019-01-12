/**
 * 栈
 */
export abstract class Stack<T> {
  abstract isEmpty(): boolean;
  abstract peek(): T;
  abstract push(value: T): void;
  abstract pop(): T;
  abstract toArray(): T[];
  abstract toString(callback: (val: T) => string): string;
}
