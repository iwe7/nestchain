import {
  ERROR_ORIGINAL_ERROR,
  getDebugContext,
  getErrorLogger,
  getOriginalError,
} from './errors';
export class ErrorHandler {
  _console: Console = console;
  handleError(error: any): void {
    const originalError = this._findOriginalError(error);
    const context = this._findContext(error);
    const errorLogger = getErrorLogger(error);
    errorLogger(this._console, `ERROR`, error);
    if (originalError) {
      errorLogger(this._console, `ORIGINAL ERROR`, originalError);
    }
    if (context) {
      errorLogger(this._console, 'ERROR CONTEXT', context);
    }
  }

  /** @internal */
  _findContext(error: any): any {
    if (error) {
      return getDebugContext(error)
        ? getDebugContext(error)
        : this._findContext(getOriginalError(error));
    }

    return null;
  }

  /** @internal */
  _findOriginalError(error: Error): any {
    let e = getOriginalError(error);
    while (e && getOriginalError(e)) {
      e = getOriginalError(e);
    }
    return e;
  }
}

export function wrappedError(message: string, originalError: any): Error {
  const msg = `${message} caused by: ${
    originalError instanceof Error ? originalError.message : originalError
  }`;
  const error = Error(msg);
  (error as any)[ERROR_ORIGINAL_ERROR] = originalError;
  return error;
}
