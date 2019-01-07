"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GrpcClientMetadataKey = 'GrpcClientMetadataKey';
exports.GrpcClient = ims_decorator_1.makeDecorator(exports.GrpcClientMetadataKey, 'visitGrpcClient', dir => dir, (type, meta) => {
    if (ims_decorator_1.isClassMetadata(meta)) {
        meta.metadataDef.options = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            ...meta.metadataDef.options,
        };
    }
});
