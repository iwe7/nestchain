"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ClientMetadataKey = 'ClientMetadataKey';
exports.Client = ims_decorator_1.makeDecorator(exports.ClientMetadataKey, 'visitClient', dir => dir);
