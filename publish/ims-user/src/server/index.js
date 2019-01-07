"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_grpc_1 = require("ims-grpc");
let User = class User {
    register(call, callback) {
        callback(null, {});
    }
    login() { }
    logout() { }
    forget() { }
};
tslib_1.__decorate([
    ims_grpc_1.Router(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "register", null);
tslib_1.__decorate([
    ims_grpc_1.Router(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "login", null);
tslib_1.__decorate([
    ims_grpc_1.Router(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "logout", null);
tslib_1.__decorate([
    ims_grpc_1.Router(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], User.prototype, "forget", null);
User = tslib_1.__decorate([
    ims_grpc_1.Router()
], User);
exports.User = User;
