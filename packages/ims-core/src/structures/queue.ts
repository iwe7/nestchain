export abstract class Queue<T> {
  abstract isEmpty(): boolean;
  abstract peek(): T;
  abstract enqueue(value: T): T;
  abstract dequeue(): T;
  abstract toString(callback: (val: T) => string): string;
}
