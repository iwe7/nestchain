export interface EmptyError extends Error {
}
export interface EmptyErrorCtor {
    new (): EmptyError;
}
export declare const EmptyError: EmptyErrorCtor;
