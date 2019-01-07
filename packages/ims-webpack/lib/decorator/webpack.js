"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.WebpackMetadataKey = 'WebpackMetadataKey';
exports.Webpack = ims_decorator_1.makeDecorator(exports.WebpackMetadataKey, 'visitWebpack', dir => dir);
