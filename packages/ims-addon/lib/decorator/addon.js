"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.AddonMetadataKey = 'AddonMetadataKey';
exports.Addon = ims_decorator_1.makeDecorator(exports.AddonMetadataKey, 'visitAddon', dir => dir);
