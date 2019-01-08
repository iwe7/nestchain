"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_http_1 = require("ims-http");
const ims_rxjs_1 = require("ims-rxjs");
let HttpNodeBackend = class HttpNodeBackend {
    handle(req) {
        return new ims_rxjs_1.Observable(obser => {
            wx.request({
                url: req.url,
                data: req.body,
                header: req.headers,
                method: req.method,
                responseType: req.responseType,
                success: res => {
                    obser.next(new ims_http_1.HttpResponse({
                        body: res.data,
                        headers: req.headers,
                        status: res.statusCode,
                        statusText: res.errMsg,
                        url: req.url || undefined,
                    }));
                },
            });
        });
    }
};
HttpNodeBackend = tslib_1.__decorate([
    ims_core_1.Injectable()
], HttpNodeBackend);
exports.HttpNodeBackend = HttpNodeBackend;
