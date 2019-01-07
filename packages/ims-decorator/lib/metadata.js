"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_util_1 = require("ims-util");
exports.metadataTable = new ims_util_1.Table('metadata-table', {
    columns: [
        'metadataKey',
        'metadataType',
        'metadataDef',
        'parameters',
        'primaryKey',
        'target',
        'parameterIndex',
        'parameterType',
        'propertyKey',
        'propertyType',
        'descriptor',
        'returnType',
        'parameters',
        'methodRuntime',
        'metadataFactory',
        'visit',
    ],
    indices: [
        'target',
        'metadataKey',
        'metadataType',
        'propertyKey',
        'parameterIndex',
        'primaryKey',
    ],
    uniques: ['target.name-primaryKey'],
    orderBy: 'metadataType asc',
}, false);
var MetadataType;
(function (MetadataType) {
    MetadataType[MetadataType["class"] = 0] = "class";
    MetadataType[MetadataType["constructor"] = 1] = "constructor";
    MetadataType[MetadataType["parameter"] = 2] = "parameter";
    MetadataType[MetadataType["method"] = 3] = "method";
    MetadataType[MetadataType["property"] = 4] = "property";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
function isClassMetadata(def) {
    return def.metadataType === MetadataType.class;
}
exports.isClassMetadata = isClassMetadata;
function isConstructorMetadata(def) {
    return def.metadataType === MetadataType.constructor;
}
exports.isConstructorMetadata = isConstructorMetadata;
function isPropertyMetadata(def) {
    return def.metadataType === MetadataType.property;
}
exports.isPropertyMetadata = isPropertyMetadata;
function isMethodMetadata(def) {
    return def.metadataType === MetadataType.method;
}
exports.isMethodMetadata = isMethodMetadata;
function isParameterMetadata(def) {
    return def.metadataType === MetadataType.parameter;
}
exports.isParameterMetadata = isParameterMetadata;
function getMetadata(target) {
    let res = [];
    exports.metadataTable.data.forEach((data, k) => {
        if (data.target === target) {
            data['__id__'] = k;
            res.push(data);
        }
    });
    return res;
}
exports.getMetadata = getMetadata;
function defineMetadata(def) {
    exports.metadataTable.insert(def);
}
exports.defineMetadata = defineMetadata;
function searchMetadata(data) {
    let where = ims_util_1.keys(data).map(key => ({ key, value: data[key] }));
    let res = exports.metadataTable.search((a, b) => {
        return where.every(v => {
            return v.key === a && v.value === b;
        });
    }).result;
    return new Set(res);
}
exports.searchMetadata = searchMetadata;
