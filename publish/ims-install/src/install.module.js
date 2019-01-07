"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const install_controller_1 = require("./install.controller");
const install_service_1 = require("./install.service");
const ims_os_1 = require("ims-os");
const install_guard_1 = require("./install.guard");
let ImsInstallModule = class ImsInstallModule {
};
ImsInstallModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [install_controller_1.ImsInstallController],
        providers: [install_service_1.ImsInstallService, ims_os_1.ImsOs, install_guard_1.InstallGuard],
        exports: [install_service_1.ImsInstallService],
    })
], ImsInstallModule);
exports.ImsInstallModule = ImsInstallModule;
