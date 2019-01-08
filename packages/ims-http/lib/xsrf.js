"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_1 = require("./cookie");
const ims_core_1 = require("ims-core");
exports.XSRF_COOKIE_NAME = new ims_core_1.InjectionToken('XSRF_COOKIE_NAME');
exports.XSRF_HEADER_NAME = new ims_core_1.InjectionToken('XSRF_HEADER_NAME');
exports.COOKIE_TOKEN = new ims_core_1.InjectionToken('COOKIE_TOKEN');
class HttpXsrfTokenExtractor {
}
exports.HttpXsrfTokenExtractor = HttpXsrfTokenExtractor;
let HttpXsrfCookieExtractor = class HttpXsrfCookieExtractor {
    constructor(platform, cookieName) {
        this.platform = platform;
        this.cookieName = cookieName;
        this.lastCookieString = '';
        this.lastToken = null;
        this.parseCount = 0;
    }
    getToken() {
        if (this.platform === 'server') {
            return null;
        }
        const cookieString = ims_core_1.inject(exports.COOKIE_TOKEN);
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = cookie_1.parseCookieValue(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    }
};
HttpXsrfCookieExtractor = tslib_1.__decorate([
    ims_core_1.Injectable(),
    tslib_1.__param(0, ims_core_1.Inject(ims_core_1.PLATFORM_ID)),
    tslib_1.__param(1, ims_core_1.Inject(exports.XSRF_COOKIE_NAME)),
    tslib_1.__metadata("design:paramtypes", [String, String])
], HttpXsrfCookieExtractor);
exports.HttpXsrfCookieExtractor = HttpXsrfCookieExtractor;
let HttpXsrfInterceptor = class HttpXsrfInterceptor {
    constructor(tokenService, headerName) {
        this.tokenService = tokenService;
        this.headerName = headerName;
    }
    intercept(req, next) {
        const lcUrl = req.url.toLowerCase();
        if (req.method === 'GET' ||
            req.method === 'HEAD' ||
            lcUrl.startsWith('http://') ||
            lcUrl.startsWith('https://')) {
            return next.handle(req);
        }
        const token = this.tokenService.getToken();
        if (token !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, token) });
        }
        return next.handle(req);
    }
};
HttpXsrfInterceptor = tslib_1.__decorate([
    ims_core_1.Injectable(),
    tslib_1.__param(1, ims_core_1.Inject(exports.XSRF_HEADER_NAME)),
    tslib_1.__metadata("design:paramtypes", [HttpXsrfTokenExtractor, String])
], HttpXsrfInterceptor);
exports.HttpXsrfInterceptor = HttpXsrfInterceptor;
