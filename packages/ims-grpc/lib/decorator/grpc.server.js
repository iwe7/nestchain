"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.GrpcServerMetadataKey = 'GrpcServerMetadataKey';
let port = 5000;
exports.GrpcServer = ims_decorator_1.makeDecorator(exports.GrpcServerMetadataKey, 'visitGrpcServer', dir => dir, (type, meta) => {
    if (ims_decorator_1.isClassMetadata(meta)) {
        meta.metadataDef.options = {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            ...meta.metadataDef.options,
        };
        meta.metadataDef.address =
            meta.metadataDef.address || `0.0.0.0:${++port}`;
    }
});
