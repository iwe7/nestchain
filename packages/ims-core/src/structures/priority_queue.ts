import { MinHeap } from './heap';
import { Comparator } from './comparator';

export abstract class PriorityQueue<T> extends MinHeap<T> {
  priorities: { [key: string]: any };
  abstract add(item: T, priority: number): PriorityQueue<T>;
  abstract remove(
    item: T,
    customFindingComparator?: Comparator<T>,
  ): PriorityQueue<T>;
  abstract changePriority(item: T, priority: number): PriorityQueue<T>;
  abstract findByValue(item: T): number[];
  abstract hasValue(item: T): boolean;
  abstract comparePriority(a: string, b: string): -1 | 0 | 1;
  abstract compareValue(a: T, b: T): -1 | 0 | 1;
}
