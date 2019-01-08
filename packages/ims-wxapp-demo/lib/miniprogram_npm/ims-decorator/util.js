"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const ims_util_1 = require("ims-util");
const _getMetadata = (type) => (v, key) => {
    return Reflect.getMetadata(type, v, key);
};
exports.getDesignParamTypes = _getMetadata('design:paramtypes');
exports.getDesignReturnType = _getMetadata('design:returntype');
exports.getDesignType = _getMetadata('design:type');
exports.createMetadataType = (type, classMetadata) => {
    let classFactory = classMetadata.map(it => it.metadataFactory);
    let Target = ims_util_1.compose(...classFactory)(type);
    return Target;
};
function getPrototypeMetadata(meta, p) {
    return meta.filter(it => {
        if (metadata_1.isPropertyMetadata(it) || metadata_1.isMethodMetadata(it)) {
            return it.propertyKey === p;
        }
        return false;
    });
}
exports.getPrototypeMetadata = getPrototypeMetadata;
function createMetadataParams(metas, args) {
    const item = {};
    metas.map(it => {
        if (metadata_1.isParameterMetadata(it)) {
            item[it.parameterIndex] = item[it.parameterIndex] || [];
            item[it.parameterIndex].push(it.metadataFactory);
        }
    });
    Object.keys(item).map(index => {
        args[index] = ims_util_1.compose(...item[index])(args[index]);
    });
    return args;
}
exports.createMetadataParams = createMetadataParams;
