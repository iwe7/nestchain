"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const ims_install_1 = require("ims-install");
const ims_const_1 = require("ims-const");
let IndexController = class IndexController {
    constructor(install) {
        this.install = install;
    }
    async index(res) {
        let existInstallLock = await this.install.notExistInstallLock();
        if (existInstallLock) {
            res.redirect('/install');
            return;
        }
        return 'welcome to index';
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IndexController.prototype, "index", null);
IndexController = tslib_1.__decorate([
    common_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [ims_install_1.ImsInstallService])
], IndexController);
exports.IndexController = IndexController;
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = tslib_1.__decorate([
    common_1.Module({
        controllers: [IndexController],
        imports: [ims_install_1.ImsInstallModule],
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
async function bootstrap(port) {
    const app = await core_1.NestFactory.create(ApplicationModule);
    app.useStaticAssets(ims_const_1.PUBLIC_PATH);
    await app.listen(port);
}
exports.bootstrap = bootstrap;
