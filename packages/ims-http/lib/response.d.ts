import { HttpHeaders } from './headers';
export declare enum HttpEventType {
    Sent = 0,
    UploadProgress = 1,
    ResponseHeader = 2,
    DownloadProgress = 3,
    Response = 4,
    User = 5
}
export interface HttpProgressEvent {
    type: HttpEventType.DownloadProgress | HttpEventType.UploadProgress;
    loaded: number;
    total?: number;
}
export interface HttpDownloadProgressEvent extends HttpProgressEvent {
    type: HttpEventType.DownloadProgress;
    partialText?: string;
}
export interface HttpUploadProgressEvent extends HttpProgressEvent {
    type: HttpEventType.UploadProgress;
}
export interface HttpSentEvent {
    type: HttpEventType.Sent;
}
export interface HttpUserEvent<T> {
    type: HttpEventType.User;
}
export interface HttpJsonParseError {
    error: Error;
    text: string;
}
export declare type HttpEvent<T> = HttpSentEvent | HttpHeaderResponse | HttpResponse<T> | HttpProgressEvent | HttpUserEvent<T>;
export declare abstract class HttpResponseBase {
    readonly headers: HttpHeaders;
    readonly status: number;
    readonly statusText: string;
    readonly url: string | null;
    readonly ok: boolean;
    readonly type: HttpEventType.Response | HttpEventType.ResponseHeader;
    constructor(init: {
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    }, defaultStatus?: number, defaultStatusText?: string);
}
export declare class HttpHeaderResponse extends HttpResponseBase {
    constructor(init?: {
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    });
    readonly type: HttpEventType.ResponseHeader;
    clone(update?: {
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    }): HttpHeaderResponse;
}
export declare class HttpResponse<T> extends HttpResponseBase {
    readonly body: T | null;
    constructor(init?: {
        body?: T | null;
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    });
    readonly type: HttpEventType.Response;
    clone(): HttpResponse<T>;
    clone(update: {
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    }): HttpResponse<T>;
    clone<V>(update: {
        body?: V | null;
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    }): HttpResponse<V>;
}
export declare class HttpErrorResponse extends HttpResponseBase implements Error {
    readonly name = "HttpErrorResponse";
    readonly message: string;
    readonly error: any | null;
    readonly ok = false;
    constructor(init: {
        error?: any;
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    });
}
