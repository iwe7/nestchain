"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_platform_wxapp_1 = require("ims-platform-wxapp");
const ims_core_1 = require("ims-core");
let WxappTest = class WxappTest {
};
WxappTest = tslib_1.__decorate([
    ims_core_1.NgModule({
        imports: [ims_platform_wxapp_1.ImsPlatformWxappModule],
    })
], WxappTest);
exports.WxappTest = WxappTest;
ims_platform_wxapp_1.platformWxapp([])
    .bootstrapModule(WxappTest)
    .subscribe(res => {
    console.log(res);
    debugger;
});
