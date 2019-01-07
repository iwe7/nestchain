"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const core_1 = require("@angular/core");
const ims_http_1 = require("ims-http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const varhttpAdapter = require('axios/lib/adapters/http');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let HttpNodeBackend = class HttpNodeBackend {
    handle(req) {
        return rxjs_1.from(axios_1.default.request({
            url: req.url,
            method: req.method,
            baseURL: req.baseUrl,
            timeout: 5000,
            withCredentials: req.withCredentials,
            adapter: varhttpAdapter,
            responseType: req.responseType,
            data: req.body,
            headers: req.headers,
            params: req.params,
            onUploadProgress: () => {
                if (req.reportProgress) {
                }
            },
            onDownloadProgress: () => {
                if (req.reportProgress) {
                }
            },
        })).pipe(operators_1.map(res => {
            return new ims_http_1.HttpResponse({
                body: res.data,
                headers: req.headers,
                status: res.status,
                statusText: res.statusText,
                url: req.url || undefined,
            });
        }));
    }
};
HttpNodeBackend = tslib_1.__decorate([
    core_1.Injectable()
], HttpNodeBackend);
exports.HttpNodeBackend = HttpNodeBackend;
