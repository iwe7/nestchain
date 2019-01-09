import { OperatorFunction } from '../types';
export declare function bufferCount<T>(bufferSize: number, startBufferEvery?: number): OperatorFunction<T, T[]>;
