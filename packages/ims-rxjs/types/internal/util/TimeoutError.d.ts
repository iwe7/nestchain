export interface TimeoutError extends Error {
}
export interface TimeoutErrorCtor {
    new (): TimeoutError;
}
export declare const TimeoutError: TimeoutErrorCtor;
