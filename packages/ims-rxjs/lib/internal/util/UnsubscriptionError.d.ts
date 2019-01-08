export interface UnsubscriptionError extends Error {
    readonly errors: any[];
}
export interface UnsubscriptionErrorCtor {
    new (errors: any[]): UnsubscriptionError;
}
export declare const UnsubscriptionError: UnsubscriptionErrorCtor;
