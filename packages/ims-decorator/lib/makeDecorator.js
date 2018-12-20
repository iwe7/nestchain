"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const ims_util_1 = require("ims-util");
const util_1 = require("./util");
function makeDecorator(metadataKey, visit, defaultOptions = dir => dir, typeFn, callback) {
    return (...args) => {
        return (target, propertyKey, descriptor) => {
            let opt = {};
            if (ims_util_1.isFunction(defaultOptions)) {
                opt = defaultOptions(...args);
            }
            let meta = {
                metadataKey,
                metadataType: metadata_1.MetadataType.class,
                metadataDef: opt || {},
                metadataFactory: null,
                target,
                visit,
            };
            if (!ims_util_1.isNullOrUndefined(propertyKey)) {
                if (ims_util_1.isNumber(descriptor)) {
                    const types = util_1.getDesignParamTypes(target, propertyKey);
                    meta.metadataType = metadata_1.MetadataType.parameter;
                    meta.propertyKey = propertyKey;
                    meta.parameterIndex = descriptor;
                    meta.parameterType = types[descriptor];
                    meta.parameters = types;
                    meta.target = target.constructor;
                    meta.primaryKey = `${metadataKey}_parameter_${descriptor}`;
                    typeFn && typeFn(target, meta);
                    metadata_1.defineMetadata(meta);
                }
                else if (ims_util_1.isNullOrUndefined(descriptor)) {
                    const type = util_1.getDesignType(target, propertyKey);
                    meta.metadataType = metadata_1.MetadataType.property;
                    meta.propertyKey = propertyKey;
                    meta.propertyType = type;
                    meta.primaryKey = `${metadataKey}_property_${propertyKey}`;
                    meta.target = target.constructor;
                    typeFn && typeFn(target, meta);
                    metadata_1.defineMetadata(meta);
                }
                else {
                    const returnType = util_1.getDesignReturnType(target, propertyKey);
                    const parameters = util_1.getDesignParamTypes(target, propertyKey);
                    const designType = util_1.getDesignType(target, propertyKey);
                    meta.propertyKey = propertyKey;
                    meta.descriptor = descriptor;
                    meta.returnType = returnType;
                    meta.parameters = parameters || [];
                    meta.propertyType = designType;
                    meta.methodRuntime = 'default';
                    meta.primaryKey = `${metadataKey}_method_${propertyKey}`;
                    meta.target = target.constructor;
                    if (ims_util_1.isFunction(descriptor.get) || ims_util_1.isFunction(descriptor.set)) {
                        meta.metadataType = metadata_1.MetadataType.property;
                    }
                    else {
                        meta.metadataType = metadata_1.MetadataType.method;
                    }
                    typeFn && typeFn(target, meta);
                    metadata_1.defineMetadata(meta);
                }
            }
            else if (ims_util_1.isNumber(descriptor)) {
                const parameters = util_1.getDesignParamTypes(target);
                meta.metadataType = metadata_1.MetadataType.constructor;
                meta.parameterIndex = descriptor;
                meta.parameterType = parameters[descriptor];
                meta.parameters = parameters;
                meta.primaryKey = `${metadataKey}_constructor_${descriptor}`;
                typeFn && typeFn(target, meta);
                metadata_1.defineMetadata(meta);
            }
            else {
                const parameters = util_1.getDesignParamTypes(target);
                meta.metadataType = metadata_1.MetadataType.class;
                meta.primaryKey = metadataKey;
                meta.parameters = parameters;
                typeFn && typeFn(target, meta);
                metadata_1.defineMetadata(meta);
            }
            callback && callback(target, meta);
        };
    };
}
exports.makeDecorator = makeDecorator;
