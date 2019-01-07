"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_nest_1 = require("ims-nest");
const microservices_1 = require("@nestjs/microservices");
let ImsPeerController = class ImsPeerController {
    constructor() { }
    getPeer() {
        return 'get';
    }
    getPeers() {
        return 'list';
    }
};
tslib_1.__decorate([
    microservices_1.GrpcMethod('GetPeer'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ImsPeerController.prototype, "getPeer", null);
tslib_1.__decorate([
    microservices_1.GrpcMethod('GetPeerList'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ImsPeerController.prototype, "getPeers", null);
ImsPeerController = tslib_1.__decorate([
    ims_nest_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [])
], ImsPeerController);
exports.ImsPeerController = ImsPeerController;
