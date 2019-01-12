import { Comparator } from './comparator';

/**
 * 堆 (数据结构)
 */

export abstract class Heap<T> {
  compare: Comparator<T>;
  heapContainer: T[] = [];
  abstract getLeftChildIndex(parentIndex: number): number;
  abstract getRightChildIndex(parentIndex: number): number;
  abstract getParentIndex(childIndex: number): number;
  abstract hasParent(childIndex: number): boolean;
  abstract hasLeftChild(parentIndex: number): boolean;
  abstract hasRightChild(parentIndex: number): boolean;
  abstract leftChild(parentIndex: number): T;
  abstract rightChild(parentIndex: number): T;
  abstract parent(childIndex: number): T;
  abstract swap(indexOne: number, indexTwo: number): void;
  abstract peek(): T;
  abstract poll(): T;
  abstract add(item: T, priority?: number): Heap<T>;
  abstract remove(item: T, comparator?: Comparator<T>): Heap<T>;
  abstract find(item: T, comparator?: Comparator<T>): number[];
  abstract isEmpty(): boolean;
  abstract toString(): string;
  abstract heapifyUp(customStartIndex: number): void;
  abstract heapifyDown(customStartIndex: number): void;
  abstract pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean;
}

export abstract class MinHeap<T> extends Heap<T> {
  pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}

export abstract class MaxHeap<T> extends Heap<T> {
  pairIsInCorrectOrder(firstElement: T, secondElement: T): boolean {
    return this.compare.greaterThanOrEqual(firstElement, secondElement);
  }
}
