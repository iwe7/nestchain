import { Key } from './key';
export type Callback<T> = (err?: Error, val?: T) => void;
export type Batch<Value> = {
  put(key: Key, val: Value): void;
  delete(key: Key): void;
  commit(call: Callback<void>): void;
};
export type Query<T> = {
  prefix?: string;
  filters?: Array<Filter<T>>;
  orders?: Array<Order<T>>;
  limit?: number;
  offset?: number;
  keysOnly?: boolean;
};
export type PullEnd = boolean | Error;
export type PullSource<T> = (
  end: PullEnd,
  fn: (end: PullEnd, val: T) => void,
) => void;
export type QueryEntry<T> = {
  key: Key;
  value?: T;
};
export type QueryResult<T> = PullSource<QueryEntry<T>>;
export type Order<T> = (res: QueryResult<T>) => -1 | 0 | 1;
export type Filter<T> = (entry: QueryEntry<T>) => boolean;
export abstract class Datastore<T> {
  abstract open(): Promise<void>;
  abstract close(): Promise<void>;
  abstract batch(): Batch<T>;
  abstract put(key: Key, val: T): Promise<void>;
  abstract get(key: Key): Promise<T>;
  abstract has(key: Key): Promise<boolean>;
  abstract delete(key: Key): Promise<void>;
  abstract query(q: Query<T>): QueryResult<T>;
}

export abstract class DatastoreFactory {
  abstract create<T>(): Datastore<T>;
}
