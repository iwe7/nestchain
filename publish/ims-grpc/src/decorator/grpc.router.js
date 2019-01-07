"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const ims_util_1 = require("ims-util");
exports.GrpcRouterMetadataKey = 'GrpcRouterMetadataKey';
exports.GrpcRouter = ims_decorator_1.makeDecorator(exports.GrpcRouterMetadataKey, 'visitGrpcRouter', path => ({ path }), (type, meta) => {
    if (ims_decorator_1.isMethodMetadata(meta)) {
        meta.metadataDef.path =
            meta.metadataDef.path || ims_util_1.titleCase(meta.propertyKey);
    }
    if (ims_decorator_1.isClassMetadata(meta)) {
        meta.metadataDef.path = meta.metadataDef.path || ims_util_1.titleCase(type.name);
    }
    return meta;
});
