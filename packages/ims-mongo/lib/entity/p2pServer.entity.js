"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let P2pServerEntity = class P2pServerEntity {
};
tslib_1.__decorate([
    typeorm_1.ObjectIdColumn(),
    tslib_1.__metadata("design:type", typeorm_1.ObjectID)
], P2pServerEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], P2pServerEntity.prototype, "address", void 0);
P2pServerEntity = tslib_1.__decorate([
    typeorm_1.Entity('ims_p2p_server')
], P2pServerEntity);
exports.P2pServerEntity = P2pServerEntity;
