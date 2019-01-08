import { InjectionToken } from 'ims-core';
import { Observable } from 'rxjs';
import { HttpHandler } from './backend';
import { HttpInterceptor } from './interceptor';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
export declare const XSRF_COOKIE_NAME: InjectionToken<string>;
export declare const XSRF_HEADER_NAME: InjectionToken<string>;
export declare const COOKIE_TOKEN: InjectionToken<string>;
export declare abstract class HttpXsrfTokenExtractor {
    abstract getToken(): string | null;
}
export declare class HttpXsrfCookieExtractor implements HttpXsrfTokenExtractor {
    private platform;
    private cookieName;
    private lastCookieString;
    private lastToken;
    parseCount: number;
    constructor(platform: string, cookieName: string);
    getToken(): string | null;
}
export declare class HttpXsrfInterceptor implements HttpInterceptor {
    private tokenService;
    private headerName;
    constructor(tokenService: HttpXsrfTokenExtractor, headerName: string);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
