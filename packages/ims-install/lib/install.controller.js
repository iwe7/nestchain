"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ims_os_1 = require("ims-os");
const install_guard_1 = require("./install.guard");
let ImsInstallController = class ImsInstallController {
    constructor(os) {
        this.os = os;
    }
    async index(res) {
        res.type('.html');
        res.set('Accept', 'text/plain');
    }
    async getOs() {
        return this.os.getOs();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ImsInstallController.prototype, "index", null);
tslib_1.__decorate([
    common_1.Get('getOs'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ImsInstallController.prototype, "getOs", null);
ImsInstallController = tslib_1.__decorate([
    common_1.Controller('/install'),
    common_1.UseGuards(install_guard_1.InstallGuard),
    tslib_1.__metadata("design:paramtypes", [ims_os_1.ImsOs])
], ImsInstallController);
exports.ImsInstallController = ImsInstallController;
