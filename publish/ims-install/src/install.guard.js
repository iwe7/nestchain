"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const install_service_1 = require("./install.service");
let InstallGuard = class InstallGuard {
    constructor(install) {
        this.install = install;
    }
    canActivate(context) {
        let res = this.install.notExistInstallLock();
        return res;
    }
};
InstallGuard = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [install_service_1.ImsInstallService])
], InstallGuard);
exports.InstallGuard = InstallGuard;
