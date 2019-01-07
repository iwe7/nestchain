"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./module"), exports);
tslib_1.__exportStar(require("./httpBackend"), exports);
const ims_core_1 = require("ims-core");
const module_1 = require("./module");
exports.platformWxapp = ims_core_1.createPlatformFactory(ims_core_1.corePlatform, 'ims-platform-wxapp', [
    {
        provide: ims_core_1.PLATFORM_INITIALIZER,
        useFactory: () => {
            return () => {
                App({
                    onLaunch: function () {
                        console.log('App Launch');
                    },
                    onShow: function () {
                        console.log('App Show');
                    },
                    onHide: function () {
                        console.log('App Hide');
                    },
                    globalData: {
                        hasLogin: false,
                    },
                });
            };
        },
        multi: true,
    },
], [module_1.ImsPlatformWxappModule]);
