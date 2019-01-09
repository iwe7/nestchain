import { Observable } from '../../Observable';
import { Subscriber } from '../../Subscriber';
import { TeardownLogic } from '../../types';
export interface AjaxRequest {
    url?: string;
    body?: any;
    user?: string;
    async?: boolean;
    method?: string;
    headers?: Object;
    timeout?: number;
    password?: string;
    hasContent?: boolean;
    crossDomain?: boolean;
    withCredentials?: boolean;
    createXHR?: () => XMLHttpRequest;
    progressSubscriber?: Subscriber<any>;
    responseType?: string;
}
export interface AjaxCreationMethod {
    (urlOrRequest: string | AjaxRequest): Observable<AjaxResponse>;
    get(url: string, headers?: Object): Observable<AjaxResponse>;
    post(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
    put(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
    patch(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
    delete(url: string, headers?: Object): Observable<AjaxResponse>;
    getJSON<T>(url: string, headers?: Object): Observable<T>;
}
export declare function ajaxGet(url: string, headers?: Object): AjaxObservable<AjaxResponse>;
export declare function ajaxPost(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
export declare function ajaxDelete(url: string, headers?: Object): Observable<AjaxResponse>;
export declare function ajaxPut(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
export declare function ajaxPatch(url: string, body?: any, headers?: Object): Observable<AjaxResponse>;
export declare function ajaxGetJSON<T>(url: string, headers?: Object): Observable<T>;
export declare class AjaxObservable<T> extends Observable<T> {
    static create: AjaxCreationMethod;
    private request;
    constructor(urlOrRequest: string | AjaxRequest);
    _subscribe(subscriber: Subscriber<T>): TeardownLogic;
}
export declare class AjaxSubscriber<T> extends Subscriber<Event> {
    request: AjaxRequest;
    private xhr;
    private done;
    constructor(destination: Subscriber<T>, request: AjaxRequest);
    next(e: Event): void;
    private send;
    private serializeBody;
    private setHeaders;
    private setupEvents;
    unsubscribe(): void;
}
export declare class AjaxResponse {
    originalEvent: Event;
    xhr: XMLHttpRequest;
    request: AjaxRequest;
    status: number;
    response: any;
    responseText: string;
    responseType: string;
    constructor(originalEvent: Event, xhr: XMLHttpRequest, request: AjaxRequest);
}
export declare type AjaxErrorNames = 'AjaxError' | 'AjaxTimeoutError';
export interface AjaxError extends Error {
    xhr: XMLHttpRequest;
    request: AjaxRequest;
    status: number;
    responseType: string;
    response: any;
}
export interface AjaxErrorCtor {
    new (message: string, xhr: XMLHttpRequest, request: AjaxRequest): AjaxError;
}
export declare const AjaxError: AjaxErrorCtor;
export interface AjaxTimeoutError extends AjaxError {
}
export interface AjaxTimeoutErrorCtor {
    new (xhr: XMLHttpRequest, request: AjaxRequest): AjaxTimeoutError;
}
export declare const AjaxTimeoutError: AjaxTimeoutErrorCtor;
