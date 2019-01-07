"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.OnMetadataKey = 'OnMetadataKey';
exports.On = ims_decorator_1.makeDecorator(exports.OnMetadataKey, 'visitOn', dir => dir);
