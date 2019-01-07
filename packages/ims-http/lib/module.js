"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var HttpClientXsrfModule_1;
const ims_core_1 = require("ims-core");
const backend_1 = require("./backend");
const client_1 = require("./client");
const interceptor_1 = require("./interceptor");
const xsrf_1 = require("./xsrf");
let HttpInterceptingHandler = class HttpInterceptingHandler {
    constructor(backend, injector) {
        this.backend = backend;
        this.injector = injector;
        this.chain = null;
    }
    handle(req) {
        if (this.chain === null) {
            const interceptors = this.injector.get(interceptor_1.HTTP_INTERCEPTORS, []);
            this.chain = interceptors.reduceRight((next, interceptor) => new interceptor_1.HttpInterceptorHandler(next, interceptor), this.backend);
        }
        return this.chain.handle(req);
    }
};
HttpInterceptingHandler = tslib_1.__decorate([
    ims_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [backend_1.HttpBackend, ims_core_1.Injector])
], HttpInterceptingHandler);
exports.HttpInterceptingHandler = HttpInterceptingHandler;
function interceptingHandler(backend, interceptors = []) {
    if (!interceptors) {
        return backend;
    }
    return interceptors.reduceRight((next, interceptor) => new interceptor_1.HttpInterceptorHandler(next, interceptor), backend);
}
exports.interceptingHandler = interceptingHandler;
function jsonpCallbackContext() {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}
exports.jsonpCallbackContext = jsonpCallbackContext;
let HttpClientXsrfModule = HttpClientXsrfModule_1 = class HttpClientXsrfModule {
    static disable() {
        return {
            ngModule: HttpClientXsrfModule_1,
            providers: [{ provide: xsrf_1.HttpXsrfInterceptor, useClass: interceptor_1.NoopInterceptor }],
        };
    }
    static withOptions(options = {}) {
        return {
            ngModule: HttpClientXsrfModule_1,
            providers: [
                options.cookieName
                    ? { provide: xsrf_1.XSRF_COOKIE_NAME, useValue: options.cookieName }
                    : [],
                options.headerName
                    ? { provide: xsrf_1.XSRF_HEADER_NAME, useValue: options.headerName }
                    : [],
            ],
        };
    }
};
HttpClientXsrfModule = HttpClientXsrfModule_1 = tslib_1.__decorate([
    ims_core_1.NgModule({
        providers: [
            xsrf_1.HttpXsrfInterceptor,
            {
                provide: interceptor_1.HTTP_INTERCEPTORS,
                useExisting: xsrf_1.HttpXsrfInterceptor,
                multi: true,
            },
            { provide: xsrf_1.HttpXsrfTokenExtractor, useClass: xsrf_1.HttpXsrfCookieExtractor },
            { provide: xsrf_1.XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
            { provide: xsrf_1.XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
        ],
    })
], HttpClientXsrfModule);
exports.HttpClientXsrfModule = HttpClientXsrfModule;
let HttpClientModule = class HttpClientModule {
};
HttpClientModule = tslib_1.__decorate([
    ims_core_1.NgModule({
        imports: [
            HttpClientXsrfModule.withOptions({
                cookieName: 'XSRF-TOKEN',
                headerName: 'X-XSRF-TOKEN',
            }),
        ],
        providers: [
            client_1.HttpClient,
            { provide: backend_1.HttpHandler, useClass: HttpInterceptingHandler },
        ],
    })
], HttpClientModule);
exports.HttpClientModule = HttpClientModule;
