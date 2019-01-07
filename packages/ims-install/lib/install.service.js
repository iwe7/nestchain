"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ImsInstallService = class ImsInstallService {
    async notExistInstallLock() {
        return false;
    }
};
ImsInstallService = tslib_1.__decorate([
    common_1.Injectable()
], ImsInstallService);
exports.ImsInstallService = ImsInstallService;
