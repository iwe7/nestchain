"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_nest_1 = require("ims-nest");
const peer_controller_1 = require("./peer.controller");
const peer_service_1 = require("./peer.service");
let ImsPeerModule = class ImsPeerModule {
};
ImsPeerModule = tslib_1.__decorate([
    ims_nest_1.Module({
        controllers: [peer_controller_1.ImsPeerController],
        providers: [peer_service_1.ImsPeerService],
    })
], ImsPeerModule);
exports.ImsPeerModule = ImsPeerModule;
