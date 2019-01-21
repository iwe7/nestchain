import { InjectionToken } from 'ims-core';
interface InspectOptions extends NodeJS.InspectOptions {}
interface CustomPromisify<TCustom extends Function> extends Function {
  __promisify__: TCustom;
}

interface UtilTypes {
  isAnyArrayBuffer(object: any): boolean;
  isArgumentsObject(object: any): object is IArguments;
  isArrayBuffer(object: any): object is ArrayBuffer;
  isAsyncFunction(object: any): boolean;
  isBooleanObject(object: any): object is Boolean;
  isBoxedPrimitive(
    object: any,
  ): object is Number | Boolean | String | Symbol /* BigInt */;
  isDataView(object: any): object is DataView;
  isDate(object: any): object is Date;
  isExternal(object: any): boolean;
  isFloat32Array(object: any): object is Float32Array;
  isFloat64Array(object: any): object is Float64Array;
  isGeneratorFunction(object: any): boolean;
  isGeneratorObject(object: any): boolean;
  isInt8Array(object: any): object is Int8Array;
  isInt16Array(object: any): object is Int16Array;
  isInt32Array(object: any): object is Int32Array;
  isMap(object: any): boolean;
  isMapIterator(object: any): boolean;
  isNativeError(object: any): object is Error;
  isNumberObject(object: any): object is Number;
  isPromise(object: any): boolean;
  isProxy(object: any): boolean;
  isRegExp(object: any): object is RegExp;
  isSet(object: any): boolean;
  isSetIterator(object: any): boolean;
  isSharedArrayBuffer(object: any): boolean;
  isStringObject(object: any): boolean;
  isSymbolObject(object: any): boolean;
  isTypedArray(object: any): object is NodeJS.TypedArray;
  isUint8Array(object: any): object is Uint8Array;
  isUint8ClampedArray(object: any): object is Uint8ClampedArray;
  isUint16Array(object: any): object is Uint16Array;
  isUint32Array(object: any): object is Uint32Array;
  isWeakMap(object: any): boolean;
  isWeakSet(object: any): boolean;
  isWebAssemblyCompiledModule(object: any): boolean;
}

interface TextDecoder {
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;
  new (
    encoding?: string,
    options?: { fatal?: boolean; ignoreBOM?: boolean },
  ): TextDecoder;
  decode(
    input?: NodeJS.TypedArray | DataView | ArrayBuffer | null,
    options?: { stream?: boolean },
  ): string;
}

interface TextEncoder {
  readonly encoding: string;
  new (): TextEncoder;
  encode(input?: string): Uint8Array;
}
export interface Util {
  TextDecoder: TextDecoder;
  TextEncoder: TextEncoder;
  types: UtilTypes;
  format(format: any, ...param: any[]): string;
  formatWithOptions(
    inspectOptions: InspectOptions,
    format: string,
    ...param: any[]
  ): string;
  /** @deprecated since v0.11.3 - use `console.error()` instead. */
  debug(string: string): void;
  /** @deprecated since v0.11.3 - use `console.error()` instead. */
  error(...param: any[]): void;
  /** @deprecated since v0.11.3 - use `console.log()` instead. */
  puts(...param: any[]): void;
  /** @deprecated since v0.11.3 - use `console.log()` instead. */
  print(...param: any[]): void;
  /** @deprecated since v0.11.3 - use a third party module instead. */
  log(string: string): void;
  inspect: {
    (
      object: any,
      showHidden?: boolean,
      depth?: number | null,
      color?: boolean,
    ): string;
    (object: any, options: InspectOptions): string;
    colors: {
      [color: string]: [number, number] | undefined;
    };
    styles: {
      [style: string]: string | undefined;
    };
    defaultOptions: InspectOptions;
    custom: symbol;
  };
  /** @deprecated since v4.0.0 - use `Array.isArray()` instead. */
  isArray(object: any): object is any[];
  /** @deprecated since v4.0.0 - use `util.types.isRegExp()` instead. */
  isRegExp(object: any): object is RegExp;
  /** @deprecated since v4.0.0 - use `util.types.isDate()` instead. */
  isDate(object: any): object is Date;
  /** @deprecated since v4.0.0 - use `util.types.isNativeError()` instead. */
  isError(object: any): object is Error;
  inherits(constructor: any, superConstructor: any): void;
  debuglog(key: string): (msg: string, ...param: any[]) => void;
  /** @deprecated since v4.0.0 - use `typeof value === 'boolean'` instead. */
  isBoolean(object: any): object is boolean;
  /** @deprecated since v4.0.0 - use `Buffer.isBuffer()` instead. */
  isBuffer(object: any): object is Buffer;
  /** @deprecated since v4.0.0 - use `typeof value === 'function'` instead. */
  isFunction(object: any): boolean;
  /** @deprecated since v4.0.0 - use `value === null` instead. */
  isNull(object: any): object is null;
  /** @deprecated since v4.0.0 - use `value === null || value === undefined` instead. */
  isNullOrUndefined(object: any): object is null | undefined;
  /** @deprecated since v4.0.0 - use `typeof value === 'number'` instead. */
  isNumber(object: any): object is number;
  /** @deprecated since v4.0.0 - use `value !== null && typeof value === 'object'` instead. */
  isObject(object: any): boolean;
  /** @deprecated since v4.0.0 - use `(typeof value !== 'object' && typeof value !== 'function') || value === null` instead. */
  isPrimitive(object: any): boolean;
  /** @deprecated since v4.0.0 - use `typeof value === 'string'` instead. */
  isString(object: any): object is string;
  /** @deprecated since v4.0.0 - use `typeof value === 'symbol'` instead. */
  isSymbol(object: any): object is symbol;
  /** @deprecated since v4.0.0 - use `value === undefined` instead. */
  isUndefined(object: any): object is undefined;
  deprecate<T extends Function>(fn: T, message: string): T;
  isDeepStrictEqual(val1: any, val2: any): boolean;

  callbackify(
    fn: () => Promise<void>,
  ): (callback: (err: NodeJS.ErrnoException) => void) => void;
  callbackify<TResult>(
    fn: () => Promise<TResult>,
  ): (callback: (err: NodeJS.ErrnoException, result: TResult) => void) => void;
  callbackify<T1>(
    fn: (arg1: T1) => Promise<void>,
  ): (arg1: T1, callback: (err: NodeJS.ErrnoException) => void) => void;
  callbackify<T1, TResult>(
    fn: (arg1: T1) => Promise<TResult>,
  ): (
    arg1: T1,
    callback: (err: NodeJS.ErrnoException, result: TResult) => void,
  ) => void;
  callbackify<T1, T2>(
    fn: (arg1: T1, arg2: T2) => Promise<void>,
  ): (
    arg1: T1,
    arg2: T2,
    callback: (err: NodeJS.ErrnoException) => void,
  ) => void;
  callbackify<T1, T2, TResult>(
    fn: (arg1: T1, arg2: T2) => Promise<TResult>,
  ): (
    arg1: T1,
    arg2: T2,
    callback: (err: NodeJS.ErrnoException, result: TResult) => void,
  ) => void;
  callbackify<T1, T2, T3>(
    fn: (arg1: T1, arg2: T2, arg3: T3) => Promise<void>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    callback: (err: NodeJS.ErrnoException) => void,
  ) => void;
  callbackify<T1, T2, T3, TResult>(
    fn: (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    callback: (err: NodeJS.ErrnoException, result: TResult) => void,
  ) => void;
  callbackify<T1, T2, T3, T4>(
    fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    callback: (err: NodeJS.ErrnoException) => void,
  ) => void;
  callbackify<T1, T2, T3, T4, TResult>(
    fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    callback: (err: NodeJS.ErrnoException, result: TResult) => void,
  ) => void;
  callbackify<T1, T2, T3, T4, T5>(
    fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    callback: (err: NodeJS.ErrnoException) => void,
  ) => void;
  callbackify<T1, T2, T3, T4, T5, TResult>(
    fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    callback: (err: NodeJS.ErrnoException, result: TResult) => void,
  ) => void;
  callbackify<T1, T2, T3, T4, T5, T6>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      arg4: T4,
      arg5: T5,
      arg6: T6,
    ) => Promise<void>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    arg6: T6,
    callback: (err: NodeJS.ErrnoException) => void,
  ) => void;
  callbackify<T1, T2, T3, T4, T5, T6, TResult>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      arg4: T4,
      arg5: T5,
      arg6: T6,
    ) => Promise<TResult>,
  ): (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    arg6: T6,
    callback: (err: NodeJS.ErrnoException, result: TResult) => void,
  ) => void;

  promisify<TCustom extends Function>(fn: CustomPromisify<TCustom>): TCustom;
  promisify<TResult>(
    fn: (callback: (err: Error | null, result: TResult) => void) => void,
  ): () => Promise<TResult>;
  promisify(
    fn: (callback: (err?: Error | null) => void) => void,
  ): () => Promise<void>;
  promisify<T1, TResult>(
    fn: (
      arg1: T1,
      callback: (err: Error | null, result: TResult) => void,
    ) => void,
  ): (arg1: T1) => Promise<TResult>;
  promisify<T1>(
    fn: (arg1: T1, callback: (err?: Error | null) => void) => void,
  ): (arg1: T1) => Promise<void>;
  promisify<T1, T2, TResult>(
    fn: (
      arg1: T1,
      arg2: T2,
      callback: (err: Error | null, result: TResult) => void,
    ) => void,
  ): (arg1: T1, arg2: T2) => Promise<TResult>;
  promisify<T1, T2>(
    fn: (arg1: T1, arg2: T2, callback: (err?: Error | null) => void) => void,
  ): (arg1: T1, arg2: T2) => Promise<void>;
  promisify<T1, T2, T3, TResult>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      callback: (err: Error | null, result: TResult) => void,
    ) => void,
  ): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
  promisify<T1, T2, T3>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      callback: (err?: Error | null) => void,
    ) => void,
  ): (arg1: T1, arg2: T2, arg3: T3) => Promise<void>;
  promisify<T1, T2, T3, T4, TResult>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      arg4: T4,
      callback: (err: Error | null, result: TResult) => void,
    ) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
  promisify<T1, T2, T3, T4>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      arg4: T4,
      callback: (err?: Error | null) => void,
    ) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<void>;
  promisify<T1, T2, T3, T4, T5, TResult>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      arg4: T4,
      arg5: T5,
      callback: (err: Error | null, result: TResult) => void,
    ) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
  promisify<T1, T2, T3, T4, T5>(
    fn: (
      arg1: T1,
      arg2: T2,
      arg3: T3,
      arg4: T4,
      arg5: T5,
      callback: (err?: Error | null) => void,
    ) => void,
  ): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<void>;
  promisify(fn: Function): Function;
}
export const Util = new InjectionToken('Util');
