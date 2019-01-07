"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_grpc_1 = require("ims-grpc");
let NodeService = class NodeService {
    addNode(stream, callback) { }
};
tslib_1.__decorate([
    ims_grpc_1.Router(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], NodeService.prototype, "addNode", null);
NodeService = tslib_1.__decorate([
    ims_grpc_1.Router()
], NodeService);
exports.NodeService = NodeService;
