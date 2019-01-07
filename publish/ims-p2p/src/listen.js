"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.ListenMetadataKey = 'ListenMetadataKey';
exports.Listen = ims_decorator_1.makeDecorator(exports.ListenMetadataKey, 'visitListen', dir => dir);
