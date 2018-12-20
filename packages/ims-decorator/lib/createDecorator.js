"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("./metadata");
const ims_util_1 = require("ims-util");
function createDecorator(type) {
    return type;
}
exports.createDecorator = createDecorator;
function getDecorator(type) {
    return type;
}
exports.getDecorator = getDecorator;
function getStaticProperty(target, type) {
    return getDecorator(target)[type];
}
exports.getStaticProperty = getStaticProperty;
function createDecoratorProperty(type, key, metadata) {
    const factorys = [];
    metadata
        .filter(meta => metadata_1.isPropertyMetadata(meta) && meta.propertyKey === key)
        .filter(it => !ims_util_1.isNullOrUndefined(it.metadataFactory))
        .map(it => {
        if (metadata_1.isPropertyMetadata(it)) {
            factorys.push(it.metadataFactory.bind(type));
        }
    });
    if (factorys.length > 0) {
        try {
            type[key] = ims_util_1.compose(...factorys)(type[key] || undefined);
        }
        catch (err) {
            ims_util_1.compose(...factorys)(type[key] || undefined);
        }
    }
}
exports.createDecoratorProperty = createDecoratorProperty;
function createDecoratorMethod(type, key, metadata, target) {
    const factorys = [];
    const afters = [];
    const befores = [];
    const defaults = [];
    metadata
        .filter(meta => metadata_1.isMethodMetadata(meta) && meta.propertyKey === key)
        .filter(it => !ims_util_1.isNullOrUndefined(it.metadataFactory))
        .map(it => {
        if (metadata_1.isMethodMetadata(it)) {
            factorys.push(it.metadataFactory.bind(type));
            if (it.methodRuntime === 'after') {
                afters.push(it.metadataFactory.bind(type));
            }
            else if (it.methodRuntime === 'before') {
                befores.push(it.metadataFactory.bind(type));
            }
            else {
                defaults.push(it.metadataFactory.bind(type));
            }
        }
    });
    if (factorys.length > 0) {
        const oldMethod = type[key];
        if (oldMethod) {
            const newMethod = (...args) => {
                args = createDecoratorParameter(args)(target, key, type);
                if (befores.length > 0) {
                    args = ims_util_1.compose(...befores)(...args);
                }
                const result = oldMethod(...args);
                if (afters.length > 0) {
                    ims_util_1.compose(...afters)(result);
                }
                return result;
            };
            if (defaults.length > 0) {
                ims_util_1.compose(...defaults)(oldMethod.bind(type));
            }
            type[key] = newMethod;
        }
    }
}
exports.createDecoratorMethod = createDecoratorMethod;
function createDecoratorParameter(args) {
    return (type, key, that) => {
        const metadata = metadata_1.getMetadata(type);
        const item = {};
        metadata
            .filter(meta => metadata_1.isParameterMetadata(meta))
            .filter(it => !ims_util_1.isNullOrUndefined(it.metadataFactory))
            .map(it => {
            if (metadata_1.isParameterMetadata(it)) {
                item[it.parameterIndex] = item[it.parameterIndex] || [];
                item[it.parameterIndex].push(it.metadataFactory.bind(that));
            }
        });
        Object.keys(item).map(index => {
            args[index] = ims_util_1.compose(...item[index])(args[index]);
        });
        return args;
    };
}
function createDecoratorConstructor(args) {
    return (type) => {
        const metadata = metadata_1.getMetadata(type);
        const item = {};
        metadata
            .filter(meta => metadata_1.isConstructorMetadata(meta))
            .filter(it => !ims_util_1.isNullOrUndefined(it.metadataFactory))
            .forEach((it) => {
            item[it.parameterIndex] = item[it.parameterIndex] || [];
            item[it.parameterIndex].push(it.metadataFactory.bind(type));
        });
        Object.keys(item).forEach(index => {
            args[index] = ims_util_1.compose(...item[index])(args[index]);
        });
        return args;
    };
}
exports.createDecoratorConstructor = createDecoratorConstructor;
