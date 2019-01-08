export interface HttpParameterCodec {
    encodeKey(key: string): string;
    encodeValue(value: string): string;
    decodeKey(key: string): string;
    decodeValue(value: string): string;
}
export declare class HttpUrlEncodingCodec implements HttpParameterCodec {
    encodeKey(key: string): string;
    encodeValue(value: string): string;
    decodeKey(key: string): string;
    decodeValue(value: string): string;
}
export interface HttpParamsOptions {
    fromString?: string;
    fromObject?: {
        [param: string]: string | string[];
    };
    encoder?: HttpParameterCodec;
}
export declare class HttpParams {
    private map;
    private encoder;
    private updates;
    private cloneFrom;
    constructor(options?: HttpParamsOptions);
    has(param: string): boolean;
    get(param: string): string | null;
    getAll(param: string): string[] | null;
    keys(): string[];
    append(param: string, value: string): HttpParams;
    set(param: string, value: string): HttpParams;
    delete(param: string, value?: string): HttpParams;
    toString(): string;
    private clone;
    private init;
}
