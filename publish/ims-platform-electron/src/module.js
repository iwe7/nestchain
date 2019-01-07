"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_core_1 = require("ims-core");
const ims_platform_browser_1 = require("ims-platform-browser");
const ims_http_1 = require("ims-http");
let ImsPlatformElectronModule = class ImsPlatformElectronModule {
};
ImsPlatformElectronModule = tslib_1.__decorate([
    ims_core_1.NgModule({
        providers: [
            {
                provide: ims_http_1.HttpBackend,
                useClass: ims_platform_browser_1.HttpXhrBackend,
                deps: [],
            },
        ],
    })
], ImsPlatformElectronModule);
exports.ImsPlatformElectronModule = ImsPlatformElectronModule;
