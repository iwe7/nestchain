"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ConnectionMetadataKey = 'ConnectionMetadataKey';
exports.Connection = ims_decorator_1.makeDecorator(exports.ConnectionMetadataKey, 'visitConnection', dir => dir);
