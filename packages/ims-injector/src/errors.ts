import { Injector } from './di/injector';
export abstract class DebugContext {
  abstract get view(): any;
  abstract get nodeIndex(): number | null;
  abstract get injector(): Injector;
  abstract get component(): any;
  abstract get providerTokens(): any[];
  abstract get references(): { [key: string]: any };
  abstract get context(): any;
  abstract get componentRenderElement(): any;
  abstract get renderNode(): any;
  abstract logError(console: Console, ...values: any[]): void;
}
export const ERROR_TYPE = 'ngType';
export const ERROR_DEBUG_CONTEXT = 'ngDebugContext';
export const ERROR_ORIGINAL_ERROR = 'ngOriginalError';
export const ERROR_LOGGER = 'ngErrorLogger';

export function getType(error: Error): Function {
  return (error as any)[ERROR_TYPE];
}

export function getDebugContext(error: Error): DebugContext {
  return (error as any)[ERROR_DEBUG_CONTEXT];
}

export function getOriginalError(error: Error): Error {
  return (error as any)[ERROR_ORIGINAL_ERROR];
}

export function getErrorLogger(
  error: Error,
): (console: Console, ...values: any[]) => void {
  return (error as any)[ERROR_LOGGER] || defaultErrorLogger;
}

function defaultErrorLogger(console: Console, ...values: any[]) {
  (<any>console.error)(...values);
}
