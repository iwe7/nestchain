"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ServerMetadataKey = 'ServerMetadataKey';
exports.Server = ims_decorator_1.makeDecorator(exports.ServerMetadataKey, 'visitServer', dir => dir);
