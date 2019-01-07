"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.SendMetadataKey = 'SendMetadataKey';
exports.Send = ims_decorator_1.makeDecorator(exports.SendMetadataKey, 'visitSend', dir => dir);
