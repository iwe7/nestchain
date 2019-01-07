"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.RouterMetadataKey = 'RouterMetadataKey';
exports.Router = ims_decorator_1.makeDecorator(exports.RouterMetadataKey, 'visitRouter', dir => dir);
