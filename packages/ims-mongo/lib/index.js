"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const log_entity_1 = require("./log.entity");
const ims_const_1 = require("ims-const");
const rxjs_1 = require("rxjs");
const entity_1 = require("./entity");
const options = {
    ...ims_const_1.MONGO_CONFIG,
    entities: [log_entity_1.Log, entity_1.P2pServerEntity],
};
tslib_1.__exportStar(require("./entity"), exports);
exports.connection = rxjs_1.from(typeorm_1.createConnection(options));
