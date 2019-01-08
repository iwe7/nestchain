"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.Inject = ims_decorator_1.makeDecorator('Inject', 'visitInject', (token) => ({ token }));
exports.Optional = ims_decorator_1.makeDecorator('Optional', 'visitOptional');
exports.Self = ims_decorator_1.makeDecorator('Self', 'visitSelf');
exports.SkipSelf = ims_decorator_1.makeDecorator('SkipSelf', 'visitSkipSelf');
exports.Host = ims_decorator_1.makeDecorator('Host', 'visitHost');
