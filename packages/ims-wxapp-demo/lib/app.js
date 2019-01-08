"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("ims-polyfill");
const ims_platform_wxapp_1 = require("ims-platform-wxapp");
const ims_core_1 = require("ims-core");
let WxappModule = class WxappModule {
};
WxappModule = tslib_1.__decorate([
    ims_core_1.NgModule()
], WxappModule);
exports.WxappModule = WxappModule;
ims_platform_wxapp_1.platformWxapp()
    .bootstrapModule(WxappModule)
    .subscribe(res => {
    console.log(res);
});
