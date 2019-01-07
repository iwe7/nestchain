"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
class HttpInterceptorHandler {
    constructor(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    handle(req) {
        return this.interceptor.intercept(req, this.next);
    }
}
exports.HttpInterceptorHandler = HttpInterceptorHandler;
exports.HTTP_INTERCEPTORS = new ims_core_1.InjectionToken('HTTP_INTERCEPTORS');
let NoopInterceptor = class NoopInterceptor {
    intercept(req, next) {
        return next.handle(req);
    }
};
NoopInterceptor = tslib_1.__decorate([
    ims_core_1.Injectable()
], NoopInterceptor);
exports.NoopInterceptor = NoopInterceptor;
