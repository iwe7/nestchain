import {
  Tapable as _Tapable,
  SyncHook,
  SyncBailHook,
  SyncLoopHook,
  SyncWaterfallHook,
  AsyncParallelHook,
  AsyncSeriesHook,
  AsyncParallelBailHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} from 'tapable';
import { Injectable } from 'ims-core';

export class Tapable extends _Tapable {}

@Injectable({
  providedIn: 'root',
})
export class ImsTapable {
  /**
   * sync
   * @param args string[]
   */
  createSync<T1 = any, T2 = any, T3 = any>(
    ...args: string[]
  ): SyncHook<T1, T2, T3> {
    return new SyncHook(args);
  }
  /**
   * sync bail
   * @param args string[]
   */
  createSyncBail<T1 = any, T2 = any, T3 = any, THookResult = any>(
    ...args: string[]
  ): SyncBailHook<T1, T2, T3, THookResult> {
    return new SyncBailHook(args);
  }
  /**
   * sync loop
   * @param args string[]
   */
  createSyncLoop<T1 = any, T2 = any, T3 = any>(
    ...args: string[]
  ): SyncLoopHook<T1, T2, T3> {
    return new SyncLoopHook(args);
  }
  /**
   * sync waterfall
   * @param args string[]
   */
  createSyncWaterfall<T1 = any, T2 = any, T3 = any>(
    ...args: string[]
  ): SyncWaterfallHook<T1, T2, T3> {
    return new SyncWaterfallHook(args);
  }

  /**
   * async parallel
   * @param args
   */
  createAsyncParallel<T1 = any, T2 = any, T3 = any>(
    ...args: string[]
  ): AsyncParallelHook<T1, T2, T3> {
    return new AsyncParallelHook(args);
  }
  /**
   * async parallel bail
   * @param args string[]
   */
  createAsyncParallelBail<T1 = any, T2 = any, T3 = any, THookResult = any>(
    ...args: string[]
  ): AsyncParallelBailHook<T1, T2, T3, THookResult> {
    return new AsyncParallelBailHook(args);
  }
  /**
   * async series
   * @param args
   */
  createAsyncSeries<T1 = any, T2 = any, T3 = any>(
    ...args: string[]
  ): AsyncSeriesHook<T1, T2, T3> {
    return new AsyncSeriesHook(args);
  }

  /**
   * async series bail
   * @param args string[]
   */
  createAsyncSeriesBail<T1 = any, T2 = any, T3 = any, THookResult = any>(
    ...args: string[]
  ): AsyncSeriesBailHook<T1, T2, T3, THookResult> {
    return new AsyncSeriesBailHook(args);
  }

  /**
   * async series waterfall
   * @param args string[]
   */
  createAsyncSeriesWaterfall<T1 = any, T2 = any, T3 = any>(
    ...args: string[]
  ): AsyncSeriesWaterfallHook<T1, T2, T3> {
    return new AsyncSeriesWaterfallHook(args);
  }
}
