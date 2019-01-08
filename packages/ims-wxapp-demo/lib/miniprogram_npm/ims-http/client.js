"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_rxjs_1 = require("ims-rxjs");
const operators_1 = require("ims-rxjs/operators");
const backend_1 = require("./backend");
const headers_1 = require("./headers");
const params_1 = require("./params");
const request_1 = require("./request");
const response_1 = require("./response");
function addBody(options, body) {
    return {
        body,
        headers: options.headers,
        observe: options.observe,
        params: options.params,
        reportProgress: options.reportProgress,
        responseType: options.responseType,
        withCredentials: options.withCredentials,
    };
}
let HttpClient = class HttpClient {
    constructor(handler) {
        this.handler = handler;
    }
    request(first, url, options = {}) {
        let req;
        if (first instanceof request_1.HttpRequest) {
            req = first;
        }
        else {
            let headers = undefined;
            if (options.headers instanceof headers_1.HttpHeaders) {
                headers = options.headers;
            }
            else {
                headers = new headers_1.HttpHeaders(options.headers);
            }
            let params = undefined;
            if (!!options.params) {
                if (options.params instanceof params_1.HttpParams) {
                    params = options.params;
                }
                else {
                    params = new params_1.HttpParams({
                        fromObject: options.params,
                    });
                }
            }
            req = new request_1.HttpRequest(first, url, options.body !== undefined ? options.body : null, {
                headers,
                params,
                reportProgress: options.reportProgress,
                responseType: options.responseType || 'json',
                withCredentials: options.withCredentials,
            });
        }
        const events$ = ims_rxjs_1.of(req).pipe(operators_1.concatMap((req) => this.handler.handle(req)));
        if (first instanceof request_1.HttpRequest || options.observe === 'events') {
            return events$;
        }
        const res$ = (events$.pipe(operators_1.filter((event) => event instanceof response_1.HttpResponse)));
        switch (options.observe || 'body') {
            case 'body':
                switch (req.responseType) {
                    case 'arraybuffer':
                        return res$.pipe(operators_1.map((res) => {
                            if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                throw new Error('Response is not an ArrayBuffer.');
                            }
                            return res.body;
                        }));
                    case 'text':
                        return res$.pipe(operators_1.map((res) => {
                            if (res.body !== null && typeof res.body !== 'string') {
                                throw new Error('Response is not a string.');
                            }
                            return res.body;
                        }));
                    default:
                        return res$.pipe(operators_1.map((res) => res.body));
                }
            case 'response':
                return res$;
            default:
                throw new Error(`Unreachable: unhandled observe type ${options.observe}}`);
        }
    }
    delete(url, options = {}) {
        return this.request('DELETE', url, options);
    }
    get(url, options = {}) {
        return this.request('GET', url, options);
    }
    head(url, options = {}) {
        return this.request('HEAD', url, options);
    }
    jsonp(url, callbackParam) {
        return this.request('JSONP', url, {
            params: new params_1.HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
            observe: 'body',
            responseType: 'json',
        });
    }
    options(url, options = {}) {
        return this.request('OPTIONS', url, options);
    }
    patch(url, body, options = {}) {
        return this.request('PATCH', url, addBody(options, body));
    }
    post(url, body, options = {}) {
        return this.request('POST', url, addBody(options, body));
    }
    put(url, body, options = {}) {
        return this.request('PUT', url, addBody(options, body));
    }
};
HttpClient = tslib_1.__decorate([
    ims_core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [backend_1.HttpHandler])
], HttpClient);
exports.HttpClient = HttpClient;
