"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
exports.MqttServerMetadataKey = 'MqttServerMetadataKey';
exports.MqttServer = ims_decorator_1.makeDecorator(exports.MqttServerMetadataKey, 'visitMqttServer', dir => dir, (type, meta) => {
    if (ims_decorator_1.isClassMetadata(meta)) {
    }
});
