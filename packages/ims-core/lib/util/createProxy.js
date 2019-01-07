"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const l = require("../interface/lifecycle");
function createProxy(Target) {
    let isObject = typeof Target === 'object' || typeof Target === 'function';
    if (!isObject) {
        return Target;
    }
    if (typeof Target === 'undefined') {
        return Target;
    }
    if (Target === null) {
        return Target;
    }
    return new Proxy(Target, {
        getPrototypeOf(tar) {
            if (l.hasOnBeforeGetPrototypeOf(tar)) {
                tar.onBeforeGetPrototypeOf();
            }
            if (l.hasOnGetPrototypeOf(tar)) {
                return createProxy(tar.OnGetPrototypeOf());
            }
            return createProxy(Reflect.getPrototypeOf(tar));
        },
        setPrototypeOf(tar, v) {
            if (l.hasOnBeforeSetPrototypeOf(tar)) {
                v = tar.onBeforeSetPrototypeOf(v);
            }
            if (l.hasOnSetPrototypeOf(tar)) {
                return tar.OnSetPrototypeOf(v);
            }
            return Reflect.setPrototypeOf(tar, v);
        },
        isExtensible(tar) {
            if (l.hasOnBeforeIsExtensible(tar)) {
                tar.onBeforeIsExtensible();
            }
            if (l.hasOnIsExtensible(tar)) {
                return tar.OnIsExtensible();
            }
            return Reflect.isExtensible(tar);
        },
        preventExtensions(tar) {
            if (l.hasOnBeforePreventExtensions(tar)) {
                tar.onBeforePreventExtensions();
            }
            if (l.hasOnPreventExtensions(tar)) {
                return tar.OnPreventExtensions();
            }
            return Reflect.preventExtensions(tar);
        },
        getOwnPropertyDescriptor(tar, p) {
            if (l.hasOnBeforeGetOwnPropertyDescriptor(tar)) {
                p = tar.onBeforeGetOwnPropertyDescriptor(p);
            }
            if (l.hasOnGetOwnPropertyDescriptor(tar)) {
                return tar.onGetOwnPropertyDescriptor(p);
            }
            return Reflect.getOwnPropertyDescriptor(tar, p);
        },
        has(tar, p) {
            if (l.hasOnBeforeHas(tar)) {
                p = tar.onBeforeHas(p);
            }
            if (l.hasOnHas(tar)) {
                return tar.onHas(p);
            }
            return Reflect.has(tar, p);
        },
        get(tar, p, receiver) {
            if (l.hasOnBeforeGet(tar)) {
                [p, receiver] = tar.onBeforeGet(p, receiver);
            }
            if (l.hasOnGet(tar)) {
                return createProxy(tar.onGet(p, receiver));
            }
            return createProxy(Reflect.get(tar, p, receiver));
        },
        set(tar, p, value, receiver) {
            if (l.hasOnBeforeSet(tar)) {
                [p, value, receiver] = tar.onBeforeSet(p, value, receiver);
            }
            if (l.hasOnSet(tar)) {
                return tar.OnSet(p, value, receiver);
            }
            return Reflect.set(tar, p, value, receiver);
        },
        deleteProperty(tar, p) {
            if (l.hasOnBeforeDeleteProperty(tar)) {
                p = tar.onBeforeDeleteProperty(p);
            }
            if (l.hasOnDeleteProperty(tar)) {
                return tar.OnDeleteProperty(p);
            }
            return Reflect.deleteProperty(tar, p);
        },
        defineProperty(tar, p, attributes) {
            if (l.hasOnBeforeDefineProperty(tar)) {
                [p, attributes] = tar.onBeforeDefineProperty(p, attributes);
            }
            if (l.hasOnDefineProperty(tar)) {
                return tar.OnDefineProperty(p, attributes);
            }
            return Reflect.defineProperty(tar, p, attributes);
        },
        enumerate(tar) {
            if (l.hasOnBeforeEnumerate(tar)) {
                tar.onBeforeEnumerate();
            }
            if (l.hasOnEnumerate(tar)) {
                return tar.OnEnumerate();
            }
            return Reflect.enumerate(tar);
        },
        ownKeys(tar) {
            if (l.hasOnBeforeOwnKeys(tar)) {
                tar.onBeforeOwnKeys();
            }
            if (l.hasOnOwnKeys(tar)) {
                return tar.OnOwnKeys();
            }
            return Reflect.ownKeys(tar);
        },
        apply(tar, thisArg, argArray) {
            if (l.hasOnBeforeApply(tar)) {
                [thisArg, argArray] = tar.onBeforeApply(thisArg, argArray);
            }
            if (l.hasOnApply(tar)) {
                return createProxy(tar.OnApply(thisArg, argArray));
            }
            return createProxy(Reflect.apply(tar, thisArg, argArray));
        },
        construct(tar, argArray, newTarget) {
            if (l.hasOnBeforeConstruct(tar)) {
                [argArray, newTarget] = tar.onBeforeConstruct(argArray, newTarget);
            }
            if (l.hasOnConstruct(tar)) {
                return createProxy(tar.OnConstruct(argArray, newTarget));
            }
            return createProxy(new tar(...argArray));
        },
    });
}
exports.createProxy = createProxy;
