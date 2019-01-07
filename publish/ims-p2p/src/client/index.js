"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ims_protocol_1 = require("ims-protocol");
let P2pClient = class P2pClient {
};
P2pClient = tslib_1.__decorate([
    ims_protocol_1.Client({
        router: [],
    })
], P2pClient);
exports.P2pClient = P2pClient;
