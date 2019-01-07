"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ims_decorator_1 = require("ims-decorator");
const inject_1 = require("./inject");
function createProxyType(type) {
    let meta = ims_decorator_1.getMetadata(type);
    let parameters = ims_decorator_1.getDesignParamTypes(type) || [];
    meta
        .filter(it => ims_decorator_1.isClassMetadata(it))
        .forEach(it => {
        if (it.metadataFactory) {
            type = it.metadataFactory(type);
        }
    });
    return createProxy(type, {
        construct(target, argArray, newTarget) {
            let parameterMetas = meta.filter(paramMeta => {
                if (ims_decorator_1.isConstructorMetadata(paramMeta)) {
                    parameters = paramMeta.parameters;
                    return true;
                }
                return false;
            });
            parameters.forEach((paramType, index) => {
                let val = paramType;
                if (!argArray[index]) {
                    parameterMetas
                        .filter(it => it.parameterIndex === index)
                        .forEach(it => {
                        if (it.metadataFactory)
                            val = it.metadataFactory(val);
                    });
                    argArray[index] = inject_1.inject(val);
                }
            });
            let instance = Reflect.construct(target, argArray, newTarget);
            return createProxy(instance, {
                get(target, p, receiver) {
                    let old = Reflect.get(target, p, receiver);
                    meta.forEach(it => {
                        if (ims_decorator_1.isMethodMetadata(it)) {
                            if (it.propertyKey === p) {
                                if (it.metadataFactory) {
                                    old = it.metadataFactory(meta);
                                }
                            }
                        }
                        else if (ims_decorator_1.isPropertyMetadata(it)) {
                            if (it.propertyKey === p) {
                                if (it.metadataFactory) {
                                    old = it.metadataFactory(meta);
                                }
                            }
                        }
                    });
                    if (typeof old === 'function' || typeof old === 'object') {
                        if (old !== null) {
                            return createProxy(old, {
                                apply(target, thisArg, argArray) {
                                    let parameters = [];
                                    let parameterMetas = meta.filter(paramMeta => {
                                        if (ims_decorator_1.isParameterMetadata(paramMeta)) {
                                            if (paramMeta.propertyKey === p) {
                                                parameters = paramMeta.parameters;
                                                return true;
                                            }
                                        }
                                        return false;
                                    });
                                    parameters.forEach((paramType, index) => {
                                        let val = paramType;
                                        if (!argArray[index]) {
                                            parameterMetas
                                                .filter(it => it.parameterIndex === index)
                                                .forEach(it => {
                                                if (it.metadataFactory)
                                                    val = it.metadataFactory(val);
                                            });
                                            argArray[index] = inject_1.inject(paramType);
                                        }
                                    });
                                    return Reflect.apply(target, thisArg, argArray);
                                },
                            });
                        }
                    }
                    return old;
                },
            });
        },
    });
}
exports.createProxyType = createProxyType;
function createProxy(item, config) {
    return new Proxy(item, {
        getPrototypeOf(target) {
            return Reflect.getPrototypeOf(target);
        },
        setPrototypeOf(target, v) {
            return Reflect.setPrototypeOf(target, v);
        },
        isExtensible(target) {
            return Reflect.isExtensible(target);
        },
        preventExtensions(target) {
            return Reflect.preventExtensions(target);
        },
        getOwnPropertyDescriptor(target, p) {
            return Reflect.getOwnPropertyDescriptor(target, p);
        },
        has(target, p) {
            return Reflect.has(target, p);
        },
        get(target, p, receiver) {
            return Reflect.get(target, p, receiver);
        },
        set(target, p, value, receiver) {
            return Reflect.set(target, p, value, receiver);
        },
        deleteProperty(target, p) {
            return Reflect.deleteProperty(target, p);
        },
        defineProperty(target, p, attributes) {
            return Reflect.defineProperty(target, p, attributes);
        },
        enumerate(target) {
            return Reflect.enumerate(target);
        },
        ownKeys(target) {
            return Reflect.ownKeys(target);
        },
        apply(target, thisArg, argArray) {
            return Reflect.apply(target, thisArg, argArray);
        },
        construct(target, argArray, newTarget) {
            return Reflect.construct(target, argArray, newTarget);
        },
        ...config,
    });
}
exports.createProxy = createProxy;
