"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const _getMetadata = (type) => (v, key) => {
    return Reflect.getMetadata(type, v, key);
};
exports.getDesignParamTypes = _getMetadata('design:paramtypes');
exports.getDesignReturnType = _getMetadata('design:returntype');
exports.getDesignType = _getMetadata('design:type');
