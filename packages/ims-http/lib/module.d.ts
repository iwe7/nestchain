import { Injector, ModuleWithProviders } from 'ims-core';
import { Observable } from 'ims-rxjs';
import { HttpBackend, HttpHandler } from './backend';
import { HttpInterceptor } from './interceptor';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
export declare class HttpInterceptingHandler implements HttpHandler {
    private backend;
    private injector;
    private chain;
    constructor(backend: HttpBackend, injector: Injector);
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
export declare function interceptingHandler(backend: HttpBackend, interceptors?: HttpInterceptor[] | null): HttpHandler;
export declare function jsonpCallbackContext(): Object;
export declare class HttpClientXsrfModule {
    static disable(): ModuleWithProviders<HttpClientXsrfModule>;
    static withOptions(options?: {
        cookieName?: string;
        headerName?: string;
    }): ModuleWithProviders<HttpClientXsrfModule>;
}
export declare class HttpClientModule {
}
