"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const ims_const_1 = require("ims-const");
const ims_fs_1 = require("ims-fs");
let ImsInstallService = class ImsInstallService {
    async notExistInstallLock() {
        let res = await ims_fs_1.exists(ims_const_1.INSTALL_LOCK);
        return !res;
    }
};
ImsInstallService = tslib_1.__decorate([
    common_1.Injectable()
], ImsInstallService);
exports.ImsInstallService = ImsInstallService;
