"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Node = class Node {
};
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "ip", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "port", void 0);
Node = tslib_1.__decorate([
    typeorm_1.Entity('ims-node')
], Node);
exports.Node = Node;
