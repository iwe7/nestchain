"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const httpBackend_1 = require("./httpBackend");
const ims_http_1 = require("ims-http");
let ImsPlatformWxappModule = class ImsPlatformWxappModule {
};
ImsPlatformWxappModule = tslib_1.__decorate([
    ims_core_1.NgModule({
        providers: [
            {
                provide: ims_http_1.HttpBackend,
                useClass: httpBackend_1.HttpNodeBackend,
                deps: [],
            },
        ],
    })
], ImsPlatformWxappModule);
exports.ImsPlatformWxappModule = ImsPlatformWxappModule;
