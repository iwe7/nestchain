import { InjectionToken } from 'ims-core';
import { Observable } from 'rxjs';
import { HttpHandler } from './backend';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
export interface HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
export declare class HttpInterceptorHandler implements HttpHandler {
    private next;
    private interceptor;
    constructor(next: HttpHandler, interceptor: HttpInterceptor);
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
export declare const HTTP_INTERCEPTORS: InjectionToken<HttpInterceptor[]>;
export declare class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
